import { IHotel } from "./hotel";

export interface IRoom {
  hotel: IHotel;
  roomNumber: number;
  roomType: string;
  price_per_night: number;
  isAvailable: boolean;
}
