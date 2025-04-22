import { Component, OnInit } from "@angular/core";
import { HotelService } from "src/app/services/hotel.service";
// import { AccommodationService } from "../../../../core/services/accommodation.service";
// import { Property } from "../../../../core/models/accommodation.models";

@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.scss"],
})
export class PropertyComponent implements OnInit {
  roomTypes: string[] = ["Single", "Double", "Deluxe", "Suite"];
  selectedRoomType = "Single";
  rooms: any[] = []; // Заменили properties на rooms
  filteredRooms: any[] = [];
  propertiesTranslate = 0;

  ngOnInit(): void {
    this.loadRooms();
  }
  constructor(private hotelService: HotelService) {}

  loadRooms(): void {
    // this.hotelService.getProperties().subscribe((properties) => {
    //   this.properties = properties;
    //   this.filterProperties();
    // });
    this.rooms = [
      {
        name: "Deluxe Room",
        type: "Deluxe",
        imageUrl: "/assets/images/deluxe.jpg",
      },
      {
        name: "Single Room",
        type: "Single",
        imageUrl: "/assets/images/single.jpg",
      },
      { name: "Suite", type: "Suite", imageUrl: "/assets/images/suite.jpg" },
      {
        name: "Double Room",
        type: "Double",
        imageUrl: "/assets/images/double.jpg",
      },
    ];
    this.filterRooms();
  }

  selectRoomType(type: string): void {
    this.selectedRoomType = type;
    this.filterRooms();
    this.propertiesTranslate = 0;
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter(
      (room) => room.type === this.selectedRoomType
    );
  }

  nextProperties(): void {
    const containerWidth =
      document.querySelector(".property-types__carousel .carousel__container")
        ?.clientWidth || 0;
    const totalWidth = this.filteredRooms.length * 300;

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
