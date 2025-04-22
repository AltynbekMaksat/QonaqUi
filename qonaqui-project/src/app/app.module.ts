import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./services/token.interceptor";
import { ProfileComponent } from "./components/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonalInfoComponent } from "./components/profile/personal-info/personal-info.component";
import { HotelReservationsComponent } from "./components/profile/hotel-reservations/hotel-reservations.component";
import { RestaurantReservationsComponent } from "./components/profile/restaurant-reservations/restaurant-reservations.component";
import { ChangePasswordModalComponent } from "./components/profile/change-password-modal/change-password-modal.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeroComponent } from "./components/main/hero/hero.component";
import { HotelsSectionComponent } from "./components/main/hotels-section/hotels-section.component";
import { FeaturesComponent } from "./components/main/features/features.component";
import { PropertyComponent } from "./components/main/property/property.component";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { BookingComponent } from "./components/booking/booking.component";
import { FilterSidebarComponent } from "./components/booking/filter-sidebar/filter-sidebar.component";
import { HotelCardComponent } from "./components/booking/hotel-card/hotel-card.component";
import { HotelDetailComponent } from "./components/hotel-detail/hotel-detail.component";
import { RoomCardComponent } from "./components/hotel-detail/room-card/room-card.component";
import { HotelGalleryComponent } from "./components/hotel-detail/hotel-gallery/hotel-gallery.component";
import { HotelAmenitiesComponent } from "./components/hotel-detail/hotel-amenities/hotel-amenities.component";
import { AboutComponent } from "./components/about/about.component";
import { SupportComponent } from "./components/support/support.component";
import { BookingFormComponent } from "./components/hotel-detail/booking-form/booking-form.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    ProfileComponent,
    PersonalInfoComponent,
    HotelReservationsComponent,
    RestaurantReservationsComponent,
    ChangePasswordModalComponent,
    FooterComponent,
    HeroComponent,
    HotelsSectionComponent,
    FeaturesComponent,
    PropertyComponent,
    SearchFormComponent,
    BookingComponent,
    FilterSidebarComponent,
    HotelCardComponent,
    HotelDetailComponent,
    RoomCardComponent,
    BookingFormComponent,
    HotelGalleryComponent,
    HotelAmenitiesComponent,
    AboutComponent,
    SupportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
