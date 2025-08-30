export interface Facility {
  id: string;
  address: string;
  cep: string;
  lat: string;
  lon: string;
}

export interface Locker {
  id: string;
  facility: Facility;
  height: number;
  width: number;
  free: boolean;
  alias: string;
}

export interface RentLockerRequest {
  lockerId: string;
  userId: string;
  rentStartDate: string; // ISO string, e.g. "2024-06-18T10:00:00"
  rentFinishDate: string; // ISO string, e.g. "2024-06-18T20:00:00"
}

export interface RentLockerResponse {
  rentRequestId: string;
  lockerId: string;
  userId: string;
  rentStartDate: string;
  rentFinishDate: string;
  openingKey: string;
  amount: string;
}
