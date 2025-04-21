import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  private apiUrl = "http://127.0.0.1:8000/booking/hotels/"; // Django API URL

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Получаем все отели без фильтрации
  }
}
