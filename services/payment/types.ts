export interface PaymentRentRequest {
  userId: string;
  rentRequestId: string;
  type: "CREDITO" | "DEBITO" | "PIX"; // adicione outros tipos se necessário
  amount: number;
  validated: boolean;
}
