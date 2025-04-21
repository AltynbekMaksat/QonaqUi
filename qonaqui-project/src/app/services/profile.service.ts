import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../shared/user";
import { Observable } from "rxjs";
import { IHotelReservation } from "../shared/hotel-reservation";
import { IRestaurantReservation } from "../shared/restaurant-reservation";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private apiUrl = "http://127.0.0.1:8000/booking";
  private userApiUrl = "http://127.0.0.1:8000/auth/users/me/";

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.http.get<IUser>(this.userApiUrl);
  }

  updateUserProfile(userData: Partial<IUser>): Observable<IUser> {
    return this.http.patch<IUser>(
      "http://127.0.0.1:8000/auth/users/me/",
      userData
    );
  }

  getHotelReservations(): Observable<IHotelReservation[]> {
    return this.http.get<IHotelReservation[]>(`${this.apiUrl}/book-room/`);
  }

  getRestaurantReservations(): Observable<IRestaurantReservation[]> {
    return this.http.get<IRestaurantReservation[]>(
      `${this.apiUrl}/book-table/`
    );
  }

  cancelHotelReservation(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cancel-room/`, {
      reservation_id: id,
    });
  }

  cancelRestaurantReservation(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cancel-table/`, {
      reservation_id: id,
    });
  }
}
