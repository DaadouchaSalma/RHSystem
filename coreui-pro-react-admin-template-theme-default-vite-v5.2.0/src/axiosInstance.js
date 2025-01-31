import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8082/api/offre-emploi', // Adjust your base URL as needed
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login'; // Use window.location.href to force redirect
    }
    return Promise.reject(error); // Reject other errors
  }
);

export default axiosInstance;
