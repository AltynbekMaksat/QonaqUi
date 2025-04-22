import { IHotel } from "./hotel";

export interface IRoom {
  hotel: IHotel;
  roomNumber: number;
  room_type: string;
  price_per_night: number;
  isAvailable: boolean;
}
