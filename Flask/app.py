import os
import asyncio
import aiohttp
from flask import Flask, request, jsonify
from textblob import TextBlob
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client['chatbotDB']
users_collection = db['users']

# Function to analyze sentiment using TextBlob
def analyze_sentiment(message):
    blob = TextBlob(message)
    polarity = blob.sentiment.polarity
    if polarity > 0:
        return "positive", polarity
    elif polarity < 0:
        return "negative", polarity
    else:
        return "neutral", polarity

# Store mood summary in MongoDB
def store_mood_summary(user_id, mood, context, timestamp):
    users_collection.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "last_session_mood": mood,
                "main_context": context
            },
            "$push": {
                "mood_summary_history": {
                    "mood": mood,
                    "timestamp": timestamp
                }
            }
        },
        upsert=True  # Create a new document if the user doesn't exist
    )

# Retrieve previous session data from MongoDB
def get_previous_session_data(user_id):
    user = users_collection.find_one({"user_id": user_id})
    if user:
        return user.get('last_session_mood'), user.get('main_context')
    return None, None

# Asynchronous function to call Gemini API
async def call_gemini_api(user_message, internal_prompt, max_output_tokens=150):
    # print(f"Sending message to Gemini: {user_message}")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={os.getenv('GEMINI_API_KEY')}"
    headers = {
        'Content-Type': 'application/json'
    }

    # Combine internal prompt with user message
    full_prompt = f"{internal_prompt}\n\nUser's input: {user_message}"
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": full_prompt
                    }
                ]
            }
        ]
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=headers) as response:
            if response.status == 200:
                gemini_response = await response.json()
                text = gemini_response.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'Sorry, I did not understand that.')
                return text

            else:
                return "Sorry, I couldn't reach the server. Please try again later."

# Define the internal prompt for the API
INTERNAL_PROMPT = """
Firstly analyse the total sentiment of the user prompt in the first sentence. like Sentiment of this message is Neutral or Depressed or UnHappy or Happy etc.
You are a mental health assistant trained in Cognitive Behavioral Therapy (CBT). 
Your goal is to help the user reflect on their emotions and thoughts, 
offering supportive, non-judgmental guidance based on CBT principles.
Please provide responses that promote mental well-being, self-reflection, 
and coping strategies in a sensitive and conservative manner.
Responses should be limited to a maximum of 3 sentences.
"""

@app.route('/chat', methods=['POST'])
async def chat():
    data = request.json
    user_id = data['user_id']
    user_message = data['message']
    
    sentiment, polarity = analyze_sentiment(user_message)

    previous_mood, main_context = get_previous_session_data(user_id)

    gemini_message = f"User's current feeling: {user_message}."
    if main_context:
        gemini_message = f"Previous context: {main_context}. {gemini_message}"

    gemini_response = await call_gemini_api(gemini_message, INTERNAL_PROMPT, max_output_tokens=150)

    timestamp = datetime.now()
    
    store_mood_summary(user_id, sentiment, user_message, timestamp)

    if previous_mood:
        greeting = f"Welcome back! Last time you were feeling {previous_mood}. How are you today?"
    else:
        greeting = "Hello! How are you feeling today?"

    return jsonify({
        "greeting": greeting,
        "sentiment": sentiment,
        "bot_response": gemini_response,
        "polarity": polarity
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)  