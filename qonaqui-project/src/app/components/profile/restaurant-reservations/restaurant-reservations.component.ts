import { Component, EventEmitter, Input, Output } from "@angular/core";
//import { RestaurantReservation } from '../../models/profile.models';

@Component({
  selector: "app-restaurant-reservations",
  templateUrl: "./restaurant-reservations.component.html",
  styleUrls: ["./restaurant-reservations.component.scss"],
})
export class RestaurantReservationsComponent {
  @Input() reservations: any[] = [];
  @Output() cancelReservation = new EventEmitter<number>();

  onCancelReservation(id: number): void {
    if (
      confirm("Are you sure you want to cancel this restaurant reservation?")
    ) {
      this.cancelReservation.emit(id);
    }
  }
}
