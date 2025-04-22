import { Component, EventEmitter, Input, Output } from "@angular/core";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge?: string;
}

@Component({
  selector: "app-hotel-card",
  templateUrl: "./hotel-card.component.html",
  styleUrls: ["./hotel-card.component.scss"],
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
  @Output() viewDetails = new EventEmitter<string>();

  getRatingLabel(rating: number): string {
    if (rating >= 9) return "Excellent";
    if (rating >= 8) return "Very Good";
    if (rating >= 7) return "Good";
    if (rating >= 6) return "Pleasant";
    return "Average";
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.hotel.id);
  }
}
