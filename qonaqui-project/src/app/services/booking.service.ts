import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IBooking } from "../shared/booking";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private apiUrl = "http://127.0.0.1:8000/booking/";

  constructor(private http: HttpClient) {}

  // Получить все бронирования пользователя
  getUserBookings(userId: string): Observable<IBooking[]> {
    return this.http
      .get<IBooking[]>(`${this.apiUrl}bookings/?user_id=${userId}`)
      .pipe(catchError(this.handleError<IBooking[]>("getUserBookings", [])));
  }

  // Получить бронирование по ID
  getBookingById(id: string): Observable<IBooking> {
    return this.http
      .get<IBooking>(`${this.apiUrl}bookings/${id}/`)
      .pipe(catchError(this.handleError<IBooking>("getBookingById")));
  }

  // Создать новое бронирование
  createBooking(booking: IBooking): Observable<IBooking> {
    return this.http
      .post<IBooking>(`${this.apiUrl}book-room/`, booking)
      .pipe(catchError(this.handleError<IBooking>("createBooking")));
  }

  // Подтвердить бронирование
  approveBooking(id: string): Observable<IBooking> {
    return this.http
      .post<IBooking>(`${this.apiUrl}approve-room/`, { booking_id: id })
      .pipe(catchError(this.handleError<IBooking>("approveBooking")));
  }

  // Отменить бронирование
  cancelBooking(id: string): Observable<IBooking> {
    return this.http
      .post<IBooking>(`${this.apiUrl}cancel-room/`, { booking_id: id })
      .pipe(catchError(this.handleError<IBooking>("cancelBooking")));
  }

  // Обработчик ошибок для всех методов
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
