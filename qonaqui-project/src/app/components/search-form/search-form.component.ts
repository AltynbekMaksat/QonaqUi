import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"],
})
export class SearchFormComponent implements OnInit {
  @Input() initialValues: Partial<ISearchParams> = {};
  @Input() buttonText: string = "Search";
  @Input() compact: boolean = false;
  @Output() search = new EventEmitter<ISearchParams>();

  searchForm!: FormGroup<{
    location: FormControl<string>;
    checkIn: FormControl<string>;
    checkOut: FormControl<string>;
    guests: FormControl<number>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: this.fb.control(this.initialValues.location || "", {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      checkIn: this.fb.control(this.initialValues.check_in || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      checkOut: this.fb.control(this.initialValues.check_out || "", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      guests: this.fb.control(this.initialValues.guests || 0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.pattern("^[0-9]*$"),
        ],
        nonNullable: true,
      }),
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  searchAccommodations(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const params: ISearchParams = {
      location: this.searchForm.get("location")!.value,
      check_in: this.searchForm.get("checkIn")!.value,
      check_out: this.searchForm.get("checkOut")!.value,
      guests: Number(this.searchForm.get("guests")!.value),
    };

    this.search.emit(params);
  }
}
