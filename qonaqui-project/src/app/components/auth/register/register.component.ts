import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        console.log("Registered successfully");
        this.router.navigate(["/"]);
      },
      error: (err: any) => {
        console.error("Registration failed", err);
        alert(JSON.stringify(err.error));
      }, // Обработка ошибки
    });
  }
}
