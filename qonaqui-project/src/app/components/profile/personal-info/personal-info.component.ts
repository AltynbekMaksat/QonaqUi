import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "src/app/services/profile.service";
import { IUser } from "src/app/shared/user";
// import { UserData } from "../../models/profile.models";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnChanges {
  @Input() userData: IUser | null = null;
  @Output() saveUserData = new EventEmitter<any>();
  @Output() openPasswordModal = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.userForm = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone_number: ["", Validators.pattern(/^\+?[0-9\s\-]+$/)],
      role: [{ value: "", disabled: true }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["userData"] && this.userData) {
      this.userForm.patchValue(this.userData);
      this.userForm.markAsPristine();
    }
  }

  ngOnInit(): void {
    console.log(this.userData);

    this.profileService.getUserProfile().subscribe({
      next: (user) => {
        this.userData = user;
        this.userForm.patchValue(this.userData);
        console.log(this.userData);
      },
      error: (err) => {
        console.error("Error fetching user data:", err);
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      this.profileService.updateUserProfile(updatedUserData).subscribe({
        next: (response) => {
          console.log("User data updated successfully:", response);
          this.saveUserData.emit(updatedUserData);
          this.userForm.markAsPristine();
        },
        error: (err) => {
          console.error("Error updating user data:", err);
        },
      });
    }
  }

  onChangePassword(): void {
    this.openPasswordModal.emit();
  }
}
