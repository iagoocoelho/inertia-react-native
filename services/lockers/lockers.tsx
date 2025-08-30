import { Api } from "../axios";
import { Locker, RentLockerRequest, RentLockerResponse } from "./types";

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

export const postRentLocker = async ({
  lockerId,
  userId,
  rentStartDate,
  rentFinishDate,
}: RentLockerRequest): Promise<RentLockerResponse> => {
  try {
    const response = await Api.post<RentLockerResponse>("/rent", {
      lockerId,
      userId,
      rentStartDate,
      rentFinishDate,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
