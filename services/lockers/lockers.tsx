import { Api } from "../axios";
import { Locker } from "./types";

export const getAllLockers = async (): Promise<Locker[]> => {
  try {
    const response = await Api.get("/locker");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLockersyFacilityId = async (id: string): Promise<Locker[]> => {
  try {
    const response = await Api.get(`/locker/facility/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
