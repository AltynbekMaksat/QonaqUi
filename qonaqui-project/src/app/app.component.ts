import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "qonaqui-project";
  isScrolled: boolean = false;
  showNavigation = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const authRoutes = ["/auth", "/auth/login", "/auth/register"];

        this.showNavigation = !authRoutes.some((route) =>
          event.urlAfterRedirects.startsWith(route)
        );
      }
    });
  }
  ngOnInit() {
    window.addEventListener("scroll", this.checkScroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener("scroll", this.checkScroll, true);
  }

  checkScroll = () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
  };
}
