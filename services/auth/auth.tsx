import * as SecureStore from "expo-secure-store";
import { Api } from "../axios";

export type UserRegisterDataRequest = {
  name: string;
  lastName: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
};
export type UserLoginRequest = {
  email: string;
  password: string;
};

export interface UserRegisterDataResponse extends UserRegisterDataRequest {
  id: string;
}

export const postRegisterUser = async ({
  ...user
}: UserRegisterDataRequest): Promise<UserRegisterDataResponse> => {
  try {
    const response = await Api.post("/user", user);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLoginUser = async ({
  ...user
}: UserLoginRequest): Promise<{ userId: string }> => {
  try {
    const response = await Api.post("/user/login", user);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await SecureStore.getItemAsync("userid");
    return userId;
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
};
