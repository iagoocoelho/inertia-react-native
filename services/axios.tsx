import axios from "axios";
import * as SecureStore from "expo-secure-store";

const ApiLogin = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    withCredentials: false,
  },
});

ApiLogin.interceptors.request.use(async (config) => {
  return config;
});

ApiLogin.interceptors.response.use(
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

const Api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const accessToken = SecureStore.getItem("accessToken");

    console.log("REQUEST INTERCEPTOR TOKEN", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    console.log("ERROR INTERCEPTOR", error);

    if (error.status === 404) {
      console.log("Ops, não encontrado!");
    } else if (error.status === 403) {
      console.log("Ops, acesso negado!");
    } else {
      throw error.response;
    }
  }
);

export { Api, ApiLogin };
