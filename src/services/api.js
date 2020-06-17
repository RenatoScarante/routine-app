import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE,
  responseType: "json"
});

api.interceptors.request.use(async config => {
  const { auth } = JSON.parse(localStorage.getItem("reduxStore"));
  const token = auth.token;

  if (token) {
    config.headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  return config;
});

export default api;
