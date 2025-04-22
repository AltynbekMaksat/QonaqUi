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

  searchForm!: FormGroup<{
    location: FormControl<string>;
    checkIn: FormControl<string>;
    checkOut: FormControl<string>;
    guests: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: this.fb.control("", {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      checkIn: this.fb.control("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      checkOut: this.fb.control("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      guests: this.fb.control("", {
        validators: [Validators.required, Validators.pattern("^[1-9][0-9]*$")],
        nonNullable: true,
      }),
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  searchAccommodations(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const formValues = this.searchForm.value;

    const params: ISearchParams = {
      location: this.searchForm.get("location")!.value,
      check_in: this.searchForm.get("checkIn")!.value,
      check_out: this.searchForm.get("checkOut")!.value,
      guests: Number(this.searchForm.get("guests")!.value),
    };

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
