import { Component, OnInit } from "@angular/core";
// import { AccommodationService } from "../../../../core/services/accommodation.service";
//import { Hotel } from "../../../../core/models/accommodation.models";

@Component({
  selector: "app-hotels-section",
  templateUrl: "./hotels-section.component.html",
  styleUrls: ["./hotels-section.component.scss"],
})
export class HotelsSectionComponent implements OnInit {
  hotels: any[] = [];
  hotelsTranslate = 0;

  //constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    //   this.loadHotels();
  }

  // loadHotels(): void {
  //   this.accommodationService.getHotels().subscribe((hotels: any[]) => {
  //     this.hotels = hotels;
  //   });
  // }

  nextHotels(): void {
    const containerWidth =
      document.querySelector(".carousel__container")?.clientWidth || 0;
    const totalWidth = this.hotels.length * 300; // Approximate card width with gap

    if (Math.abs(this.hotelsTranslate) < totalWidth - containerWidth) {
      this.hotelsTranslate -= containerWidth;
    }
  }

  prevHotels(): void {
    const containerWidth =
      document.querySelector(".carousel__container")?.clientWidth || 0;

    if (this.hotelsTranslate < 0) {
      this.hotelsTranslate += containerWidth;
      if (this.hotelsTranslate > 0) {
        this.hotelsTranslate = 0;
      }
    }
  }
}
