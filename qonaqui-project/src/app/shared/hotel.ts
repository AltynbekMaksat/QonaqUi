import { IRoom } from "./room";

export interface IHotel {
  averagePrice?: any;
  id: number;
  name: string;
  address: string;
  description: string;
  rating: number;
  rooms: IRoom[];
  photo_url: string;
  badge?: string;
}
