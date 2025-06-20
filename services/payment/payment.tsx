import { Api } from "../axios";
import { PaymentRentRequest } from "./types";

export const postPaymentRent = async ({
  userId,
  rentRequestId,
  amount,
  type,
}: PaymentRentRequest): Promise<any> => {
  try {
    const response = await Api.post("/transaction", {
      userId,
      rentRequestId,
      amount,
      type,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
