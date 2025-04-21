import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PasswordService {
  private apiUrl = "http://127.0.0.1:8000/booking/user/"; // API base URL

  constructor(private http: HttpClient) {}

  // Получение старого пароля для сравнения
  getCurrentPassword(userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}/`; // эндпоинт для получения пользователя
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return this.http.get(url, { headers });
  }

  // Изменение пароля
  changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.apiUrl}${userId}/`; // полный URL для изменения пароля
    const body = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return this.http.put(url, body, { headers });
  }
}
