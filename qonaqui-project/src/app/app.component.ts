import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "qonaqui-project";
  isScrolled: boolean = false;

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
