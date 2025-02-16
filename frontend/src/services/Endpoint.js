import axios from "axios";

// ✅ Use env variable for Base URL
export const BaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ✅ Create Axios instance
const instance = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Helper functions for API requests
export const get = (url, params) => instance.get(url, { params });

export const post = (url, data, isFormData = false) =>
  instance.post(url, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });

export const put = (url, data) => {
  console.log("🔄 PUT Request URL:", `${BaseUrl}${url}`);
  console.log("🔄 PUT Request Data:", data);
  return instance.put(url, data);
};

export const del = (url) => instance.delete(url);
export const patch = (url, data) => instance.patch(url, data);

// ✅ Logging Requests & Responses
instance.interceptors.request.use(
  (config) => {
    console.log("📤 Request:", config.method.toUpperCase(), config.url, config);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
