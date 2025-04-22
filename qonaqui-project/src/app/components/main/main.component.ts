import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ISearchParams } from "src/app/shared/search-params";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  hotels: any[] = [];
  // router: any;

  constructor(private router: Router) {}

  handleSearch(searchParams: ISearchParams): void {
    console.log("Search parameters:", searchParams);

    // Преобразуем параметры в формат, ожидаемый в URL
    const queryParams = {
      location: searchParams.location,
      check_in: searchParams.check_in,
      check_out: searchParams.check_out,
      guests: searchParams.guests,
    };

    // Навигация на страницу бронирования с параметрами
    this.router.navigate(["/booking"], { queryParams });
  }

  // handleSearch(hotels: any[]): void {
  //   this.hotels = hotels;
  //   console.log("Filtered hotels:", hotels);
  //   this.router.navigate(["/booking"], { queryParams: hotels });
  //   // In a real app, you would navigate to search results page
  //   // this.router.navigate(['/search'], {
  //   //   queryParams: searchParams
  //   // });

  //   // Or call the service to get search results
  //   // this.accommodationService
  //   //   .searchAccommodations(searchParams)
  //   //   .subscribe((results) => {
  //   //     console.log("Search results:", results);
  //   //   });
  // }
}
