import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelService } from "src/app/services/hotel.service";
import { IHotel } from "src/app/shared/hotel";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  backgroundImage = "/assets/images/booking-background.jpg";
  searchParams!: ISearchParams;

  hotels: IHotel[] = [];
  filteredHotels: IHotel[] = [];
  sortOption = "recommended";

  filters = {
    priceRange: { min: 0, max: 30000 },
    rating: 0,
    propertyType: [],
    amenities: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log("Received query params:", params);

      // Проверяем наличие всех необходимых параметров
      if (
        params["location"] &&
        params["check_in"] &&
        params["check_out"] &&
        params["guests"]
      ) {
        this.searchParams = {
          location: params["location"],
          check_in: params["check_in"],
          check_out: params["check_out"],
          guests: Number(params["guests"]),
        };

        console.log("Search params set:", this.searchParams);
        this.loadHotels();
      } else {
        console.warn("Missing required search parameters");
        // Можно установить значения по умолчанию или показать сообщение пользователю
      }
    });
  }

  onSearch(params: ISearchParams): void {
    this.searchParams = params;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        location: params.location,
        guests: params.guests,
        check_in: params.check_in,
        check_out: params.check_out,
      },
      queryParamsHandling: "merge",
    });

    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.searchHotels(this.searchParams).subscribe({
      next: (response) => {
        this.hotels = (response.hotels || response).map((hotel: any) => ({
          ...hotel,
          address: hotel.hotel_address,
          rating: hotel.hotel_rating,
          name: hotel.hotel_name,
          averagePrice: this.calculateAveragePrice(hotel.rooms), // Добавляем среднюю цену
        }));

        this.updateMaxPrice();
        this.applyFilters();
        this.sortHotels();
      },
      error: (err) => {
        console.error("Ошибка при получении отелей:", err);
        this.hotels = [];
        this.filteredHotels = [];
      },
    });
  }

  calculateAveragePrice(rooms: any[]): number {
    const total = rooms.reduce((sum, room) => sum + room.price_per_night, 0);
    return rooms.length ? total / rooms.length : 0; // Если комнат нет, возвращаем 0
  }

  onFilterChange(filters: any): void {
    this.filters = filters;
    this.applyFilters();
  }

  updateMaxPrice(): void {
    const allPrices = this.hotels.flatMap((hotel) =>
      hotel.rooms.map((room) => room.price_per_night)
    );
    this.filters.priceRange.max = Math.max(...allPrices, 0);
  }

  applyFilters(): void {
    let filtered = [...this.hotels];

    if (this.searchParams.location) {
      const location = this.searchParams.location.toLowerCase();
      filtered = filtered.filter((hotel) =>
        hotel.address?.toLowerCase().includes(location)
      );
    }

    filtered = filtered.filter((hotel) =>
      hotel.rooms.some(
        (room) =>
          room.price_per_night >= this.filters.priceRange.min &&
          room.price_per_night <= this.filters.priceRange.max
      )
    );

    if (this.filters.rating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.rating >= this.filters.rating
      );
    }

    this.filteredHotels = filtered;
    this.sortHotels();
  }

  sortHotels(): void {
    switch (this.sortOption) {
      case "price-low":
        this.filteredHotels.sort(
          (a, b) => a.averagePrice - b.averagePrice // Сортировка по средней цене
        );
        break;
      case "price-high":
        this.filteredHotels.sort(
          (a, b) => b.averagePrice - a.averagePrice // Сортировка по средней цене
        );
        break;
      case "rating":
        this.filteredHotels.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  viewHotelDetails(hotelId: string): void {
    this.router.navigate(["/hotels", hotelId]);
  }
}
