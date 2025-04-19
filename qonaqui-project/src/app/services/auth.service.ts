import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUser } from "../shared/user";
import { Observable, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://127.0.0.1:8000"; // Замените на актуальный URL

  constructor(private http: HttpClient, private router: Router) {}
  // Логин и получение токена
  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/token/login/`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem("token", res.auth_token);
          localStorage.setItem("username", username); // <--- сохраняем username
          this.router.navigate(["/"]);
        })
      );
  }

  // Получение всех пользователей (общая информация)
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/users/`);
  }

  // Получение полной информации о пользователях с использованием токена
  getDetailedUsers(): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", `Token ${token}`);
    return this.http.get(`${this.apiUrl}/booking/user/`, { headers });
  }

  // user: IUser | null = null;
  // private apiUrl = "http://127.0.0.1:8000/";

  // constructor(private http: HttpClient) {
  //   this.setUser();
  // }

  // setUser() {
  //   const item = localStorage.getItem("User");
  //   try {
  //     this.user = item ? JSON.parse(item) : null;
  //   } catch (e) {
  //     console.error("Error while setting user", e);
  //     this.user = null;
  //   }
  // }

  // // Логин: запрос на получение токена
  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>("http://127.0.0.1:8000/auth/token/login/", {
  //     username,
  //     password,
  //   });
  // }

  // // Запрос на получение текущего пользователя
  // getCurrentUser(): Observable<IUser> {
  //   const token = localStorage.getItem("authToken");
  //   const headers = new HttpHeaders().set("Authorization", `Token ${token}`);
  //   return this.http.get<IUser>("http://127.0.0.1:8000/auth/users/me/", {
  //     headers,
  //   });
  // }

  // // Регистрация (опционально, если нужно)
  // register(user: IUser): Observable<any> {
  //   return this.http.post<IUser>(`${this.apiUrl}booking/user/`, user);
  // }
}
