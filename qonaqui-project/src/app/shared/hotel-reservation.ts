import { IRoom } from "./room";

export interface IHotelReservation {
  id: number;
  customerId: number;
  room: IRoom;
  checkIn: Date;
  checkOut: Date;
  status: "Confirmed" | "Cancelled" | "Pending";
}
