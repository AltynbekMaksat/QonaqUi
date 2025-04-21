import { Component, HostListener, Input } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  @Input() scrolled: boolean = false;
  isAuth!: boolean;

  constructor(private authService: AuthService) {
    this.isAuth = !!localStorage.getItem("token");
    console.log(this.isAuth);
  }

  // @HostListener("window:scroll", [])
  // onWindowScroll(): void {
  //   this.isScrolled = window.scrollY > 50;
  //   console.log("hi");
  // }
}
