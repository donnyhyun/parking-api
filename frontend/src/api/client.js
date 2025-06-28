import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token:", token);
    }
    console.log(`[Request ${config.method.toUpperCase()} ${config.url}]`, {
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    console.log(
      `[Response ${response.config.method.toUpperCase()} ${response.config.url}]`,
      {
        status: response.status,
        data: response.data,
      },
    );
    return response;
  },
  (error) => {
    console.error("[Response Error]", error.response || error);
    return Promise.reject(error);
  },
);

export default client;
