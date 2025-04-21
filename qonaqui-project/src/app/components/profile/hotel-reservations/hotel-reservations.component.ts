import { Component, EventEmitter, Input, Output } from "@angular/core";
//import { HotelReservation } from "../../models/profile.models";

@Component({
  selector: "app-hotel-reservations",
  templateUrl: "./hotel-reservations.component.html",
  styleUrls: ["./hotel-reservations.component.scss"],
})
export class HotelReservationsComponent {
  @Input() reservations: any[] = [];
  @Output() cancelReservation = new EventEmitter<number>();

  onCancelReservation(id: number): void {
    if (confirm("Are you sure you want to cancel this hotel reservation?")) {
      this.cancelReservation.emit(id);
    }
  }
}
