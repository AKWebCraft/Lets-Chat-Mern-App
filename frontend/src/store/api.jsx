import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = (inputs) => api.post("/api/v1/signup", inputs);
export const signIn = (inputs) => api.post("/api/v1/login", inputs);
export const signOut = () => api.get("/api/v1/logout");

export const allConversations = () => api.get("/api/v1");
export const sendMessage = (data) => api.post("/api/v1/send", data);
export const getChat = (id) => api.get(`/api/v1/${id}`);

// REFRESH TOKENS
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    const errorMessage =
      error.response && error.response.data && error.response.data.message;

    if (
      error.response.status === 401 ||
      (error.response.status === 500 && originalReq && !originalReq._isRetry)
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get("http://localhost:5000/api/v1/refresh", {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);
