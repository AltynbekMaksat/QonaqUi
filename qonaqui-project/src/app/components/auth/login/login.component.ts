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
        this.router.navigate(["/"]); // Перенаправляем на страницу пользователей
      },
      error: (err) => console.error("Login failed", err), // Обработка ошибки
    });
  }
}
