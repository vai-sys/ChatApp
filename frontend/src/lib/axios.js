import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    
      console.log("Unauthorized - clearing auth state");
    }
    return Promise.reject(error);
  }
);