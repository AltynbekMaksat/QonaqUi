import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IRoom } from "src/app/shared/room";

@Component({
  selector: "app-room-card",
  templateUrl: "./room-card.component.html",
  styleUrls: ["./room-card.component.scss"],
})
export class RoomCardComponent {
  @Input() room!: IRoom;
  @Input() checkIn: string = "";
  @Input() checkOut: string = "";
  @Input() guests: number = 1;
  @Output() bookRoom = new EventEmitter<void>();
  hotel: any;

  getGuestsText(count: number): string {
    if (count === 1) return "гость";
    if (count >= 2 && count <= 4) return "гостя";
    return "гостей";
  }

  getNightsText(count: number): string {
    if (count === 1) return "ночь";
    if (count >= 2 && count <= 4) return "ночи";
    return "ночей";
  }

  calculateNights(): number {
    if (!this.checkIn || !this.checkOut) return 0;

    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);

    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  calculateTotalPrice(): number {
    const nights = this.calculateNights();
    return nights * this.room.price_per_night;
  }

  isAvailable(): boolean {
    // Здесь можно добавить логику проверки доступности номера
    // Например, проверка количества гостей и свободных дат
    //return this.room.capacity >= this.guests;
    return true;
  }

  onBookRoom(): void {
    if (this.isAvailable()) {
      this.bookRoom.emit();
    }
  }
}
