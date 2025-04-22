import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-filter-sidebar",
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.scss"],
})
export class FilterSidebarComponent implements OnInit {
  @Input() filters: any = {
    priceRange: { min: 0, max: 500 },
    rating: 0,
    propertyType: [],
    amenities: [],
    guestRating: 0,
  };

  @Output() filterChange = new EventEmitter<any>();
  @Input() maxPrice: number = 0;

  propertyTypes = ["Hotel", "Apartment", "Resort", "Villa", "Cottage"];
  amenities = [
    "Free WiFi",
    "Breakfast",
    "Pool",
    "Parking",
    "Air conditioning",
    "Spa",
    "Fitness center",
    "Restaurant",
  ];
  guestRatings = [
    { label: "Any", value: 0 },
    { label: "Good 7+", value: 7 },
    { label: "Very Good 8+", value: 8 },
    { label: "Excellent 9+", value: 9 },
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize with default values if not provided
    if (!this.filters.propertyType) {
      this.filters.propertyType = [];
    }

    if (!this.filters.amenities) {
      this.filters.amenities = [];
    }
    if (this.filters.priceRange.max < this.maxPrice) {
      this.filters.priceRange.max = this.maxPrice;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maxPrice"] && this.maxPrice > 0) {
      this.filters.priceRange.max = this.maxPrice;
    }
  }

  updateFilters(): void {
    // Ensure min doesn't exceed max
    if (this.filters.priceRange.min > this.filters.priceRange.max) {
      this.filters.priceRange.min = this.filters.priceRange.max;
    }

    this.filterChange.emit(this.filters);
  }

  resetFilters(): void {
    this.filters = {
      priceRange: { min: 0, max: this.maxPrice },
      rating: 0,
      propertyType: [],
      amenities: [],
      guestRating: 0,
    };

    this.filterChange.emit(this.filters);
  }

  setRating(rating: number): void {
    this.filters.rating = this.filters.rating === rating ? 0 : rating;
    this.updateFilters();
  }

  setGuestRating(rating: number): void {
    this.filters.guestRating = this.filters.guestRating === rating ? 0 : rating;
    this.updateFilters();
  }

  isPropertyTypeSelected(type: string): boolean {
    return this.filters.propertyType.includes(type);
  }

  togglePropertyType(type: string): void {
    const index = this.filters.propertyType.indexOf(type);
    if (index === -1) {
      this.filters.propertyType.push(type);
    } else {
      this.filters.propertyType.splice(index, 1);
    }
    this.updateFilters();
  }

  isAmenitySelected(amenity: string): boolean {
    return this.filters.amenities.includes(amenity);
  }

  toggleAmenity(amenity: string): void {
    const index = this.filters.amenities.indexOf(amenity);
    if (index === -1) {
      this.filters.amenities.push(amenity);
    } else {
      this.filters.amenities.splice(index, 1);
    }
    this.updateFilters();
  }
}
