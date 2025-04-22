import { IHotel } from "./hotel";

export interface IRoom {
  id: number;
  hotel: IHotel;
  roomNumber: number;
  room_type: string;
  price_per_night: number;
  isAvailable: boolean;
  photo_url: string;
}
