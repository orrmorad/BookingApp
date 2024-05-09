import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { AddHotelComponent } from './views/add-hotel/add-hotel.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AddReservationComponent } from './views/add-reservation/add-reservation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addhotel', component: AddHotelComponent },
  { path: 'addReservation', component: AddReservationComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
