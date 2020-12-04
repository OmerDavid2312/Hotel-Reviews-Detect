import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


//services
import { WeatherService } from './services/weather.service';
import { HotelsService } from './services/hotels.service';
import { CitiesService } from './services/cities.service';
import { AuthService } from './services/auth.service';
import { GeoService } from './services/geo.service';

//interceptor
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CitiesComponent } from './components/cities/cities.component';
import { HotelsComponent } from './components/hotels/hotels/hotels.component';
import { HotelDetailsComponent } from './components/hotels/hotel-details/hotel-details.component';
import { MapComponent } from './components/map/map.component';
import { HotelsNearByComponent } from './components/hotels/hotels-near-by/hotels-near-by.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    NotFoundComponent,
    CitiesComponent,
    HotelsComponent,
    HotelDetailsComponent,
    MapComponent,
    HotelsNearByComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    LeafletModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true,
      timeOut:6000,
      closeButton:true,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [,CitiesService,AuthService,WeatherService,HotelsService,AuthGuard,GeoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
