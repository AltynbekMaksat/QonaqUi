import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingService } from "src/app/services/booking.service";
import { HotelService } from "src/app/services/hotel.service";
import { IBooking } from "src/app/shared/booking";
import { IHotel } from "src/app/shared/hotel";
import { IRoom } from "src/app/shared/room";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-hotel-detail",
  templateUrl: "./hotel-detail.component.html",
  styleUrls: ["./hotel-detail.component.scss"],
})
export class HotelDetailComponent implements OnInit {
  hotelId!: string;
  hotel: IHotel | null = null; // Изначально null, данные загружаются асинхронно
  searchParams: ISearchParams | null = null;
  showBookingForm = false;
  selectedRoom: IRoom | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.hotelId = params.get("id") || "";
      if (this.hotelId) {
        this.loadHotelDetails(); // Загружаем данные отеля
      } else {
        this.router.navigate(["/booking"]);
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params["check_in"] && params["check_out"] && params["guests"]) {
        this.searchParams = {
          location: params["location"] || "",
          check_in: params["check_in"],
          check_out: params["check_out"],
          guests: Number(params["guests"]),
        };
      }
    });
  }

  loadHotelDetails(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (response: any) => {
        this.hotel = response.hotel; // Теперь TypeScript знает о структуре response
        console.log("Hotel details:", this.hotel);
      },
      error: (err) => {
        console.error("Error loading hotel details:", err);
        this.router.navigate(["/booking"]);
      },
    });
  }

  getRatingLabel(rating: number | undefined): string {
    if (!rating) return "No rating";
    if (rating >= 5) return "Excellent";
    if (rating >= 4.5) return "Very good";
    if (rating >= 4) return "Good";
    if (rating >= 3.5) return "Nice";
    return "Okay";
  }

  openBookingForm(room: IRoom): void {
    this.selectedRoom = room;
    this.showBookingForm = true;
    document.body.style.overflow = "hidden"; // Prevent page scrolling
  }

  closeBookingForm(event?: Event): void {
    this.showBookingForm = false;
    this.selectedRoom = null;
    document.body.style.overflow = ""; // Allow page scrolling again
  }

  onBookingComplete(booking: IBooking): void {
    console.log("Booking completed:", booking);
    this.closeBookingForm();

    alert(
      "Booking successfully completed! You can view the details in your profile."
    );

    this.router.navigate(["/profile"]);
  }
}
