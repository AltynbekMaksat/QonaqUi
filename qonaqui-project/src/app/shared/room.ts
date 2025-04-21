import { IHotel } from "./hotel";

export interface IRoom {
  hotel: IHotel;
  roomNumber: number;
  roomType: string;
  price: number;
  isAvailable: boolean;
}
