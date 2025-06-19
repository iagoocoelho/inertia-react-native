import { Api } from "../axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await Api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
