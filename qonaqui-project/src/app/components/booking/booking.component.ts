import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelService } from "src/app/services/hotel.service";
import { ISearchParams } from "src/app/shared/search-params";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge?: string;
}

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  backgroundImage = "/assets/images/booking-background.jpg";
  searchParams: ISearchParams = {
    location: "",
    check_in: "",
    check_out: "",
    guests: 1,
  };

  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  sortOption = "recommended";

  filters = {
    priceRange: { min: 0, max: 500 },
    rating: 0,
    propertyType: [],
    amenities: [],
    guestRating: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    // Get search params from route query params
    this.route.queryParams.subscribe((params) => {
      this.searchParams = {
        location: params["location"] || "",
        check_in: params["check_in"] || "",
        check_out: params["check_out"] || "",
        guests: params["guests"] ? Number(params["guests"]) : 1,
      };

      this.loadHotels();
    });
  }

  loadHotels(): void {
    this.hotelService.searchHotels(this.searchParams).subscribe({
      next: (response) => {
        this.hotels = response.hotels || response;
        this.applyFilters();
      },
      error: (err) => {
        console.error("Error fetching hotels:", err);
        // Show empty state
        this.hotels = [];
        this.filteredHotels = [];
      },
    });
  }

  onSearch(searchParams: ISearchParams): void {
    this.searchParams = searchParams;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        location: searchParams.location,
        check_in: searchParams.check_in,
        check_out: searchParams.check_out,
        guests: searchParams.guests,
      },
    });
    this.loadHotels();
  }

  onFilterChange(filters: any): void {
    this.filters = filters;
    this.applyFilters();
  }

  applyFilters(): void {
    // Start with all hotels
    let filtered = [...this.hotels];

    // Filter by location if provided
    if (this.searchParams.location) {
      const location = this.searchParams.location.toLowerCase();
      filtered = filtered.filter((hotel) =>
        hotel.location.toLowerCase().includes(location)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (hotel) =>
        hotel.price >= this.filters.priceRange.min &&
        hotel.price <= this.filters.priceRange.max
    );

    // Filter by rating
    if (this.filters.rating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.rating >= this.filters.rating
      );
    }

    // Apply property type filters if any are selected
    if (this.filters.propertyType.length > 0) {
      // This would require property type to be part of the hotel model
      // For now, we'll skip this filter
    }

    this.filteredHotels = filtered;
    this.sortHotels();
  }

  sortHotels(): void {
    switch (this.sortOption) {
      case "price-low":
        this.filteredHotels.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        this.filteredHotels.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        this.filteredHotels.sort((a, b) => b.rating - a.rating);
        break;
      case "recommended":
      default:
        // For recommended, we might use a combination of rating and reviews
        this.filteredHotels.sort(
          (a, b) => b.rating * b.reviews - a.rating * a.reviews
        );
        break;
    }
  }

  viewHotelDetails(hotelId: string): void {
    this.router.navigate(["/hotels", hotelId]);
  }
}
