import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-hotel-gallery",
  templateUrl: "./hotel-gallery.component.html",
  styleUrls: ["./hotel-gallery.component.scss"],
})
export class HotelGalleryComponent implements OnInit {
  @Input() images: string[] = [];

  currentIndex = 0;
  currentImage = "";

  ngOnInit(): void {
    if (this.images.length === 0) {
      // Если изображений нет, добавляем заглушку
      this.images = ["/assets/images/hotel-placeholder.jpg"];
    }

    this.currentImage = this.images[0];
  }

  setImage(index: number): void {
    this.currentIndex = index;
    this.currentImage = this.images[index];
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.setImage(this.currentIndex - 1);
    }
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.setImage(this.currentIndex + 1);
    }
  }
}
