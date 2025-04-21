import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordService } from "src/app/services/password.service";
import { IUser } from "src/app/shared/user";

@Component({
  selector: "app-change-password-modal",
  templateUrl: "./change-password-modal.component.html",
  styleUrls: ["./change-password-modal.component.scss"],
})
export class ChangePasswordModalComponent {
  @Input() userData!: IUser;
  @Output() close = new EventEmitter<void>();
  @Output() passwordChanged = new EventEmitter<void>();

  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService
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

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;

      // Используем переданный userId для отправки запроса на сервер
      this.passwordService.getCurrentPassword(this.userData.id).subscribe(
        (response: any) => {
          if (response.password === currentPassword) {
            this.passwordService
              .changePassword(this.userData.id, currentPassword, newPassword)
              .subscribe(
                (res) => {
                  console.log("Пароль успешно изменён");
                  this.passwordChanged.emit();
                },
                (error) => {
                  console.error("Ошибка при изменении пароля", error);
                }
              );
          } else {
            console.error("Неверный текущий пароль");
          }
        },
        (error) => {
          console.error("Ошибка при получении текущего пароля", error);
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
