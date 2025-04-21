import { IRestaurant } from "./restaurant";

export interface ITable {
  restaurant: IRestaurant;
  tableNumber: number;
  seats: number;
}
