import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IHotel } from "src/app/shared/hotel";

@Component({
  selector: "app-hotel-card",
  templateUrl: "./hotel-card.component.html",
  styleUrls: ["./hotel-card.component.scss"],
})
export class HotelCardComponent {
  @Input() hotel!: IHotel;
  @Output() viewDetails = new EventEmitter<string>();

  getRatingLabel(rating: number): string {
    if (rating >= 9) return "Excellent";
    if (rating >= 8) return "Very Good";
    if (rating >= 7) return "Good";
    if (rating >= 6) return "Pleasant";
    return "Average";
  }

  getAveragePrice(rooms: any[]): number {
    if (!rooms || rooms.length === 0) return 0;
    const total = rooms.reduce((sum, room) => sum + room.price_per_night, 0);
    return Math.round(total / rooms.length);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.hotel.id.toString());
  }
}
