import { Component, OnInit } from "@angular/core";
// import { AccommodationService } from "../../../../core/services/accommodation.service";
// import { Property } from "../../../../core/models/accommodation.models";

@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.scss"],
})
export class PropertyComponent implements OnInit {
  propertyTypes = ["Hotels", "Apartments", "Resorts", "Villas", "Cottages"];
  selectedPropertyType = "Hotels";
  properties: any[] = [];
  filteredProperties: any[] = [];
  propertiesTranslate = 0;

  // constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    // this.accommodationService.getProperties().subscribe((properties) => {
    //   this.properties = properties;
    //   this.filterProperties();
    // });
  }

  selectPropertyType(type: string): void {
    this.selectedPropertyType = type;
    this.filterProperties();
    this.propertiesTranslate = 0; // Reset carousel position
  }

  filterProperties(): void {
    this.filteredProperties = this.properties.filter(
      (property) => property.type === this.selectedPropertyType
    );
  }

  nextProperties(): void {
    const containerWidth =
      document.querySelector(".property-types__carousel .carousel__container")
        ?.clientWidth || 0;
    const totalWidth = this.filteredProperties.length * 300; // Approximate card width with gap

    if (Math.abs(this.propertiesTranslate) < totalWidth - containerWidth) {
      this.propertiesTranslate -= containerWidth;
    }
  }

  prevProperties(): void {
    const containerWidth =
      document.querySelector(".property-types__carousel .carousel__container")
        ?.clientWidth || 0;

    if (this.propertiesTranslate < 0) {
      this.propertiesTranslate += containerWidth;
      if (this.propertiesTranslate > 0) {
        this.propertiesTranslate = 0;
      }
    }
  }
}
