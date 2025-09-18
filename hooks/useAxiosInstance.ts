import { AuthContextType } from "@/context/authContext";
import { Api } from "@/services/axios";

export const setupInterceptors = (
  accessToken: AuthContextType["userInfo"]["accessToken"]
) => {
  Api.interceptors.request.use(
    (config) => {
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
      if (error.response.status === 500) {
        console.log("Ops, ocorreu um erro, tente novamente!");
      } else if (error.response.status === 404) {
        console.log("Ops, não encontrado!");
      } else {
        throw error.response;
      }
    }
  );
};
