import { Component, Input } from "@angular/core";

@Component({
  selector: "app-hotel-amenities",
  templateUrl: "./hotel-amenities.component.html",
  styleUrls: ["./hotel-amenities.component.scss"],
})
export class HotelAmenitiesComponent {
  @Input() amenities: string[] = [];

  getAmenityIcon(amenity: string): string {
    const amenityLower = amenity.toLowerCase();

    if (amenityLower.includes("wifi") || amenityLower.includes("интернет")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>';
    }

    if (amenityLower.includes("парковка")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M9 9h6v10"></path><path d="M9 14h6"></path></svg>';
    }

    if (amenityLower.includes("бассейн")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path d="M5 12v4"></path><path d="M19 12v4"></path><path d="M5 16a7 7 0 0 0 14 0"></path><path d="M7 12V8h10v4"></path></svg>';
    }

    if (
      amenityLower.includes("кондиционер") ||
      amenityLower.includes("климат")
    ) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
    }

    if (amenityLower.includes("завтрак") || amenityLower.includes("питание")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>';
    }

    if (amenityLower.includes("фитнес") || amenityLower.includes("спортзал")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6"></path><path d="M15 9l3-3 3 3-3 3"></path><path d="M6 15l3 3 3-3-3-3"></path></svg>';
    }

    if (amenityLower.includes("спа") || amenityLower.includes("сауна")) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"></path><path d="M18.5 7C18.5 8.38071 17.3807 9.5 16 9.5C14.6193 9.5 13.5 8.38071 13.5 7C13.5 5.61929 14.6193 4.5 16 4.5C17.3807 4.5 18.5 5.61929 18.5 7Z"></path><path d="M10.5 7C10.5 8.38071 9.38071 9.5 8 9.5C6.61929 9.5 5.5 8.38071 5.5 7C5.5 5.61929 6.61929 4.5 8 4.5C9.38071 4.5 10.5 5.61929 10.5 7Z"></path><path d="M5.5 13.5C6.5 13.5 7.5 12.5 8.5 12.5C9.5 12.5 10.5 13.5 11.5 13.5C12.5 13.5 13.5 12.5 14.5 12.5C15.5 12.5 16.5 13.5 17.5 13.5"></path><path d="M5.5 17.5C6.5 17.5 7.5 16.5 8.5 16.5C9.5 16.5 10.5 17.5 11.5 17.5C12.5 17.5 13.5 16.5 14.5 16.5C15.5 16.5 16.5 17.5 17.5 17.5"></path><path d="M5.5 21.5C6.5 21.5 7.5 20.5 8.5 20.5C9.5 20.5 10.5 21.5 11.5 21.5C12.5 21.5 13.5 20.5 14.5 20.5C15.5 20.5 16.5 21.5 17.5 21.5"></path></svg>';
    }

    // Иконка по умолчанию
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
  }
}
