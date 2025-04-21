import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  // users: any[] = [];
  // detailedUsers: any[] = [];

  // constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   // Получаем общую информацию (username, email, id)
  //   this.authService.getUsers().subscribe({
  //     next: (data: any) => {
  //       this.users = data;
  //     },
  //     error: (err) => {
  //       console.error("Ошибка при получении пользователей", err);
  //     },
  //   });

  //   // Получаем детальную информацию о пользователях (по токену)
  //   this.authService.getDetailedUsers().subscribe({
  //     next: (res: any) => {
  //       this.detailedUsers = res.users;
  //       console.log("Детальная информация:", this.detailedUsers);
  //     },
  //     error: (err) => {
  //       console.error("Ошибка при получении детальной информации", err);
  //     },
  //   });
  // }

  // getDetailedUser(username: string) {
  //   return this.detailedUsers.find((u) => u.username === username);
  // }

  userDetails: any = null;
  currentUsername: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUsername = localStorage.getItem("username");

    if (!this.currentUsername) {
      console.error("Пользователь не найден в localStorage");
      return;
    }

    this.authService.getDetailedUsers().subscribe({
      next: (res: any) => {
        const allDetails = res.users;
        this.userDetails = allDetails.find(
          (u: any) => u.username === this.currentUsername
        );
        console.log("Информация о текущем пользователе:", this.userDetails);
      },
      error: (err) => {
        console.error("Ошибка при получении детальной информации", err);
      },
    });
  }
}
