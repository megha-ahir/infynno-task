import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API base URL
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// there no barear token implemented 

// api.interceptors.request.use(
//     (config) => { 
//         const token = localStorage.getItem('token');  
//         if (token) {
//             config.headers.Authorization = `${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors here
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, maybe redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;
