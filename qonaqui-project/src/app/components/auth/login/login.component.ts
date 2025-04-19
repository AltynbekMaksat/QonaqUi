import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log("Logged in successfully");
        this.router.navigate(["/users"]); // Перенаправляем на страницу пользователей
      },
      error: (err) => console.error("Login failed", err), // Обработка ошибки
    });
  }
  // username!: string;
  // password!: string;

  // constructor(private authService: AuthService, private router: Router) {}

  // // Метод логина
  // login() {
  //   if (this.username && this.password) {
  //     this.authService.login(this.username, this.password).subscribe({
  //       next: (res) => {
  //         // Сохраняем токен в localStorage
  //         localStorage.setItem("authToken", res.auth_token);
  //         console.log(res);

  //         // Запрашиваем данные о текущем пользователе
  //         this.authService.getCurrentUser().subscribe({
  //           next: (user) => {
  //             // Сохраняем данные о пользователе в localStorage
  //             localStorage.setItem("User", JSON.stringify(user));
  //             console.log(user);

  //             this.authService.setUser();
  //             // Перенаправляем на главную
  //             //this.router.navigate(["/"]);
  //             //window.location.reload();
  //           },
  //           error: (err) => {
  //             console.error("Error fetching user data", err);
  //           },
  //         });
  //       },
  //       error: (err) => {
  //         console.error("Login failed", err);
  //       },
  //     });
  //   } else {
  //     console.log("Please enter username and password");
  //   }
  // }
}
