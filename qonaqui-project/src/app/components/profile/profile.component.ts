import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ProfileService } from "src/app/services/profile.service";
import { IHotelReservation } from "src/app/shared/hotel-reservation";
import { IRestaurantReservation } from "src/app/shared/restaurant-reservation";
import { IUser } from "src/app/shared/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userData!: IUser;
  hotelReservations: IHotelReservation[] = [];
  restaurantReservations: IRestaurantReservation[] = [];
  showPasswordModal = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadHotelReservations();
    this.loadRestaurantReservations();
  }

  loadUserData(): void {
    this.profileService.getUserProfile().subscribe((user: IUser) => {
      this.userData = user;
    });
  }

  loadHotelReservations(): void {
    this.profileService.getHotelReservations().subscribe((res) => {
      this.hotelReservations = res;
    });
  }

  loadRestaurantReservations(): void {
    this.profileService.getRestaurantReservations().subscribe((res) => {
      this.restaurantReservations = res;
    });
  }

  onUserDataSaved(updatedUser: IUser): void {
    this.userData = updatedUser;
  }

  openChangePasswordModal(): void {
    this.showPasswordModal = true;
  }

  closeChangePasswordModal(): void {
    this.showPasswordModal = false;
  }

  onPasswordChanged(): void {
    this.closeChangePasswordModal();
    // возможно показать уведомление
  }

  onCancelHotelReservation(id: number): void {
    this.profileService.cancelHotelReservation(id).subscribe(() => {
      this.loadHotelReservations();
    });
  }

  onCancelRestaurantReservation(id: number): void {
    this.profileService.cancelRestaurantReservation(id).subscribe(() => {
      this.loadRestaurantReservations();
    });
  }
}
