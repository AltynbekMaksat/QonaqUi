import { Component, EventEmitter, Output } from "@angular/core";
import { HotelService } from "src/app/services/hotel.service";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent {
  @Output() search = new EventEmitter<any>();

  heroBackground = "/assets/images/hero-background.jpg";
  searchLocation = ""; // location to search for in the address field
  checkInDate = "";
  checkOutDate = "";
  guestsCount = "";

  constructor(private hotelService: HotelService) {}

  searchAccommodations(): void {
    if (!this.searchLocation) {
      alert("Please enter a destination");
      return;
    }

    this.hotelService.getAllHotels().subscribe({
      next: (response) => {
        const allHotels = response.hotels || response; // зависит от структуры ответа

        const filteredHotels = allHotels.filter((hotel: any) => {
          const matchesLocation = hotel.address
            ?.toLowerCase()
            .includes(this.searchLocation.toLowerCase());

          // Можно добавить фильтрацию по дате и количеству гостей здесь
          return matchesLocation;
        });

        this.search.emit(filteredHotels);
      },
      error: (err) => {
        console.error("Error fetching hotels:", err);
        alert("Failed to fetch hotels");
      },
    });
  }
}
