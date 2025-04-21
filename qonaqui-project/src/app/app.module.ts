import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./services/token.interceptor";
import { ProfileComponent } from "./components/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PersonalInfoComponent } from './components/profile/personal-info/personal-info.component';
import { HotelReservationsComponent } from './components/profile/hotel-reservations/hotel-reservations.component';
import { RestaurantReservationsComponent } from './components/profile/restaurant-reservations/restaurant-reservations.component';
import { ChangePasswordModalComponent } from './components/profile/change-password-modal/change-password-modal.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
