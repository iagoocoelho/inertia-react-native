import { Api, ApiLogin } from "../axios";

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

interface UserLoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiration: string;
  refreshExpiration: string;
}

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
}: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    const response = await ApiLogin.post("/login", user);

    return response.data;
  } catch (error) {
    throw error;
  }
};
