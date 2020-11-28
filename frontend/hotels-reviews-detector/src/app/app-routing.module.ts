import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitiesComponent } from './components/cities/cities.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HotelsComponent } from './components/hotels/hotels/hotels.component';
import { HotelDetailsComponent } from './components/hotels/hotel-details/hotel-details.component';


const routes: Routes = [
  //cities
  { path: '', component: CitiesComponent, canActivate:[AuthGuard]}, 
  //auth
  { path: 'login', component: LoginComponent  }, 
  { path: 'register', component: RegisterComponent  }, 
  //hotels
  { path: 'hotels/:cityName', component: HotelsComponent, canActivate:[AuthGuard]}, 
  { path: 'hotels/:cityName/:hotelId', component: HotelDetailsComponent, canActivate:[AuthGuard]}, 
  
  // 404 not found
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
