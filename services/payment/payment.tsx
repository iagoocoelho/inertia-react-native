import { Api } from "../axios";
import { PaymentRentRequest } from "./types";

type PaymentRentResponse = {
  id: string;
  userId: string;
  rentRequestId: string;
  type: string;
  validated: boolean;
  amount: number;
};

type RentRequestResponse = {
  rentRequestId: string;
  lockerId: string;
  userId: string;
  rentStartDate: string;
  rentFinishDate: string;
  amount: number;
  openingKey: string;
};

export const postPaymentRent = async ({
  userId,
  rentRequestId,
  type,
}: PaymentRentRequest): Promise<PaymentRentResponse> => {
  try {
    const response = await Api.post("/transaction", {
      userId,
      type,
      rentRequestId,
      validated: true, // mock checkout pagamento
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRentRequestById = async ({
  rentRequestId,
}: {
  rentRequestId: string;
}): Promise<RentRequestResponse> => {
  try {
    const response = await Api.get(`/rent/${rentRequestId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
