import axios from "axios";

const appApi = axios.create({
  baseURL: "https://c16-24-n-node-react.vercel.app/api",
});

//Todo: conf interceptors

appApi.interceptors.request.use((config) => {
  config.headers["authorization"] = sessionStorage.getItem("token");
  return config;
});

export default appApi;