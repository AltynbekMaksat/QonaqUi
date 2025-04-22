import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HotelService } from "src/app/services/hotel.service";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent {
  @Output() search = new EventEmitter<any>();
  heroBackground = "/assets/images/hero-background.jpg";
  initialSearchValues: Partial<ISearchParams> = {};

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    // You can set initial values here if needed
    // this.initialSearchValues = {...}
  }

  onSearch(params: ISearchParams): void {
    this.hotelService.searchHotels(params).subscribe({
      next: (response) => {
        const hotels = response.hotels || response;
        this.search.emit(hotels);
      },
      error: (err) => {
        console.error("Error fetching hotels:", err);
        alert("Failed to fetch hotels");
      },
    });
  }
}
