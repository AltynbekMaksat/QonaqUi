import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  @Input() scrolled: boolean = false;
  // @HostListener("window:scroll", [])
  // onWindowScroll(): void {
  //   this.isScrolled = window.scrollY > 50;
  //   console.log("hi");
  // }
}
