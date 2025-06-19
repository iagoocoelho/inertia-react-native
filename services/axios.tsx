import axios from "axios";

const Api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    withCredentials: false,
  },
});

Api.interceptors.request.use(async (config) => {
  return config;
});

Api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 500) {
      console.log("Ops, ocorreu um erro, tente novamente!");
    } else if (error.response.status === 404) {
      console.log("Ops, não encontrado!");
    } else {
      throw error.response;
    }
  }
);

export { Api };
