import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// auto-redirect to /login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const code = err?.response?.status;
    if (code === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
