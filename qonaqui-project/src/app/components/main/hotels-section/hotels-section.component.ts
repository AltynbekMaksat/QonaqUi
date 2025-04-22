import { Component, OnInit } from "@angular/core";
import { HotelService } from "src/app/services/hotel.service";
import { IHotel } from "src/app/shared/hotel";
// import { AccommodationService } from "../../../../core/services/accommodation.service";
//import { Hotel } from "../../../../core/models/accommodation.models";

@Component({
  selector: "app-hotels-section",
  templateUrl: "./hotels-section.component.html",
  styleUrls: ["./hotels-section.component.scss"],
})
export class HotelsSectionComponent implements OnInit {
  hotels: IHotel[] = [];
  hotelsTranslate = 0;
  latitude: number | null = null;
  longitude: number | null = null;

  checkIn: string = "";
  checkOut: string = "";

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.setDynamicDates();
    this.getUserLocation();
  }

  setDynamicDates(): void {
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    this.checkIn = today.toISOString().split("T")[0]; // формат YYYY-MM-DD
    this.checkOut = oneMonthLater.toISOString().split("T")[0];
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.loadHotels();
        },
        (error) => {
          console.error("Ошибка при получении местоположения", error);
        }
      );
    } else {
      console.error("Геолокация не поддерживается вашим браузером");
    }
  }

  loadHotels(): void {
    if (this.latitude && this.longitude) {
      this.hotelService
        .searchHotelsByCoords(
          this.latitude,
          this.longitude,
          this.checkIn,
          this.checkOut
        )
        .subscribe({
          next: (res) => {
            console.log("Отели по координатам:", res);
            this.hotels = res.hotels ?? res; // зависит от структуры ответа
          },
          error: (err) => {
            console.error("Ошибка при загрузке отелей", err);
          },
        });
    }
  }

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
