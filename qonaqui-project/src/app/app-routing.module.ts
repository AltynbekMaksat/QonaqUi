import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BookingComponent } from "./components/booking/booking.component";
import { HotelDetailComponent } from "./components/hotel-detail/hotel-detail.component";
import { AboutComponent } from "./components/about/about.component";
import { SupportComponent } from "./components/support/support.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [],
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "booking",
    component: BookingComponent,
  },
  {
    path: "booking/:id",
    component: HotelDetailComponent,
  },
  { path: "about", component: AboutComponent },
  { path: "support", component: SupportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
