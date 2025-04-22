import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";
import { IBooking } from "src/app/shared/booking";
import { IHotel } from "src/app/shared/hotel";
import { IRoom } from "src/app/shared/room";
import { IUser } from "src/app/shared/user";

@Component({
  selector: "app-booking-form",
  templateUrl: "./booking-form.component.html",
  styleUrls: ["./booking-form.component.scss"],
})
export class BookingFormComponent {
  @Input() hotel: IHotel | null = null;
  @Input() room: IRoom | null = null;
  @Input() checkIn: string = "";
  @Input() checkOut: string = "";
  @Input() guests: number = 1;
  @Output() bookingComplete = new EventEmitter<IBooking>();
  @Output() cancel = new EventEmitter<void>();

  bookingForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.authService.getUserInfo().subscribe((currentUser: IUser) => {
      this.bookingForm = this.fb.group({
        firstName: [currentUser?.firstName || "", Validators.required],
        lastName: [currentUser?.lastName || "", Validators.required],
        email: [
          currentUser?.email || "",
          [Validators.required, Validators.email],
        ],
        phone: [
          currentUser?.phoneNumber || "",
          [
            Validators.required,
            Validators.pattern(/^\+?[0-9\s\-$$$$]{10,15}$/),
          ],
        ],
        specialRequests: [""],
        paymentMethod: ["card", Validators.required],
      });
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

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

  calculateRoomPrice(): number {
    const nights = this.calculateNights();
    return nights * (this.room?.price_per_night || 0);
  }

  calculateServiceFee(): number {
    // Сервисный сбор - 10% от стоимости номера
    return this.calculateRoomPrice() * 0.1;
  }

  calculateTotalPrice(): number {
    return this.calculateRoomPrice() + this.calculateServiceFee();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  submitBooking(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const bookingData: IBooking = {
      id: 0, // ID будет присвоен сервером
      room: this.room?.id || 0,
      check_in_date: this.checkIn,
      check_out_date: this.checkOut,
      guests: this.guests,
      total_price: this.calculateTotalPrice(),
      status: "confirmed",
      customer: this.f["id"]?.value || 0,
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (booking) => {
        this.isSubmitting = false;
        this.bookingComplete.emit(booking);
      },
      error: (err) => {
        console.error("Error creating booking:", err);
        this.isSubmitting = false;
        alert(
          "Произошла ошибка при бронировании. Пожалуйста, попробуйте еще раз."
        );
      },
    });
  }
}
