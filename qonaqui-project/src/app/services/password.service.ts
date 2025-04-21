import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PasswordService {
  private setPasswordUrl = "http://127.0.0.1:8000/auth/users/set_password/";

  constructor(private http: HttpClient) {}

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const body = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return this.http.post(this.setPasswordUrl, body, { headers });
  }
}
