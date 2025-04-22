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
    if (!this.initialSearchValues.location) {
      this.initialSearchValues.location = "";
    }
    if (!this.initialSearchValues.check_in) {
      this.initialSearchValues.check_in = "";
    }
    if (!this.initialSearchValues.check_out) {
      this.initialSearchValues.check_out = "";
    }
    if (!this.initialSearchValues.guests) {
      this.initialSearchValues.guests = 0;
    }
  }

  onSearch(params: ISearchParams): void {
    this.hotelService.searchHotels(params).subscribe({
      next: (response) => {
        const hotels = response.hotels || response;
        this.search.emit(params);
      },
      error: (err) => {
        console.error("Error fetching hotels:", err);
        alert("Failed to fetch hotels");
      },
    });
  }
}
