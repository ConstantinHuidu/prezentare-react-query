import Axios from "axios";
import { showToast } from "./show-toast";

const API_URL = "http://localhost:4060";

function authRequestInterceptor(config: any) {
  config.headers.Accept = "application/json";
  return config;
}

export const axiosApi = Axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(authRequestInterceptor);
axiosApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Server error";
    showToast("error", message);
    return Promise.reject(error);
  }
);
