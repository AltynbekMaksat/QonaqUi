import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordService } from "src/app/services/password.service";
import { ProfileService } from "src/app/services/profile.service";
import { IUser } from "src/app/shared/user";

@Component({
  selector: "app-change-password-modal",
  templateUrl: "./change-password-modal.component.html",
  styleUrls: ["./change-password-modal.component.scss"],
})
export class ChangePasswordModalComponent {
  @Input() userData: IUser | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() passwordChanged = new EventEmitter<void>();

  passwordForm: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private profileService: ProfileService
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    console.log(this.userData);

    this.profileService.getUserProfile().subscribe({
      next: (user) => {
        this.userData = user;
        this.userId = user.id;
        console.log(this.userData);
      },
      error: (err) => {
        console.error("Error fetching user data:", err);
      },
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;

      this.passwordService
        .changePassword(currentPassword, newPassword)
        .subscribe(
          (res) => {
            console.log("Пароль успешно изменён");
            this.passwordChanged.emit();
            this.onClose();
          },
          (error) => {
            console.error("Ошибка при изменении пароля", error);
            if (error.status === 400) {
              this.passwordForm
                .get("currentPassword")
                ?.setErrors({ invalidCurrent: true });
            }
          }
        );
    }
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get("newPassword")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;

    if (newPassword !== confirmPassword) {
      group.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }
}
