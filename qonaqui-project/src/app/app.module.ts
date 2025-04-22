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
import { HotelsSectionComponent } from './components/main/hotels-section/hotels-section.component';
import { FeaturesComponent } from './components/main/features/features.component';
import { PropertyComponent } from './components/main/property/property.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

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
