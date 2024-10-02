from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()
account_sid = os.getenv('TWILIO_ACCOUNT_SID') 
auth_token = os.getenv('TWILIO_ACCOUNT_AUTH_TOKEN')    
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Your Friend is feeling Depressed.Please help him out!!",
    from_='+12193009381', 
    to='+919398843407'      
)

print(f"Message sent! ID: {message.sid}")
