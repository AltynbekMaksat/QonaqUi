import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelService } from "src/app/services/hotel.service";
import { IFilters } from "src/app/shared/filters";
import { IHotel } from "src/app/shared/hotel";
import { IRoom } from "src/app/shared/room";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  backgroundImage = "/assets/images/booking-background.jpg";
  searchParams!: ISearchParams;
  maxPrice!: number;

  hotels: IHotel[] = [];
  filteredHotels: IHotel[] = [];
  sortOption = "recommended";

  filters: IFilters = {
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
    console.log(this.filteredHotels);
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
          id: hotel.hotel_id,
        }));

        this.updateMaxPrice();
        this.applyFilters();
        this.sortHotels();

        if (response.hotels && response.hotels.length > 0) {
          console.log("First hotel:", response.hotels[0]);
          console.log(
            "Room types:",
            response.hotels[0].rooms.map((room: IRoom) => room.room_type)
          );
        }
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
    console.log("Selected property types:", filters.propertyType);
    this.filters = filters;
    this.applyFilters();
  }

  updateMaxPrice(): void {
    const allPrices = this.hotels.flatMap((hotel) =>
      hotel.rooms.map((room) => room.price_per_night)
    );
    this.filters.priceRange.max = Math.max(...allPrices, 0);
    this.maxPrice = this.filters.priceRange.max;
  }

  applyFilters(): void {
    let filtered = [...this.hotels];

    if (this.searchParams.location) {
      const location = this.searchParams.location.toLowerCase();
      filtered = filtered.filter((hotel) =>
        hotel.address?.toLowerCase().includes(location)
      );
    }

    filtered = filtered.filter((hotel) => {
      const averagePrice =
        hotel.rooms.reduce((acc, room) => acc + room.price_per_night, 0) /
        hotel.rooms.length;

      return (
        averagePrice >= this.filters.priceRange.min &&
        averagePrice <= this.filters.priceRange.max
      );
    });

    if (this.filters.rating > 0) {
      filtered = filtered.filter(
        (hotel) => hotel.rating >= this.filters.rating
      );
    }

    if (this.filters.propertyType.length > 0) {
      console.log("Property types to filter by:", this.filters.propertyType);

      const beforeCount = filtered.length;
      filtered = filtered.filter((hotel) => {
        const hasMatchingRoom = hotel.rooms?.some((room) => {
          const roomType = room.room_type || "";
          console.log(`Hotel ${hotel.name}, Room type: ${roomType}`);
          return this.filters.propertyType.includes(roomType);
        });
        return hasMatchingRoom;
      });
      console.log(
        `After property type filter: ${filtered.length} (removed ${
          beforeCount - filtered.length
        })`
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
    this.router.navigate(["/booking", hotelId]);
  }
}
