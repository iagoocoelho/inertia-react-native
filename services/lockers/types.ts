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
}
