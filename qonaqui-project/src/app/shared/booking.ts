export interface IBooking {
  id: number;
  customer: number;
  room: number;
  check_in_date: string;
  check_out_date: string;
  status: string;
  guests: number;
  total_price: number;
}
