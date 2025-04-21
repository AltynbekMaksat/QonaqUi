import { ITable } from "./table";

export interface IRestaurantReservation {
  id: number;
  customerId: number;
  tableNumber: ITable;
  date: Date;
  time: string;
  status: "Confirmed" | "Cancelled" | "Pending";
}
