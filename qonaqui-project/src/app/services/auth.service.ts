import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUser } from "../shared/user";
import { Observable, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/token/login/`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem("token", res.auth_token);
          localStorage.setItem("username", username);
        })
      );
  }

  logout(): void {
    const token = localStorage.getItem("token");

    if (token) {
      const headers = new HttpHeaders().set("Authorization", `Token ${token}`);

      this.http
        .post(`${this.apiUrl}/auth/token/logout/`, {}, { headers })
        .subscribe({
          next: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
          },
          error: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
          },
        });
    }
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/users/`);
  }

  getDetailedUsers(): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", `Token ${token}`);
    return this.http.get(`${this.apiUrl}/booking/user/`, { headers });
  }

  register(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
      re_password: password,
    };

    return this.http
      .post(`${this.apiUrl}/auth/users/`, body)
      .pipe(switchMap(() => this.login(username, password)));
  }

  getUserInfo(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/auth/users/me/`);
  }
}
