import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Replace with your backend server URL
});

export default instance;
