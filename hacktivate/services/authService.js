import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your server URL

// User registration
const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// User login
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export { register, login };
