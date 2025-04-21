import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  hotels: any[] = [];

  // constructor(private accommodationService: AccommodationService) {}

  handleSearch(hotels: any[]): void {
    this.hotels = hotels;
    console.log("Filtered hotels:", hotels);
    // In a real app, you would navigate to search results page
    // this.router.navigate(['/search'], {
    //   queryParams: searchParams
    // });

    // Or call the service to get search results
    // this.accommodationService
    //   .searchAccommodations(searchParams)
    //   .subscribe((results) => {
    //     console.log("Search results:", results);
    //   });
  }
}
