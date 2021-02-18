import { Hotel } from './../../../models/Hotel';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HotelsService } from 'src/app/services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-hotels',
  templateUrl: './favorite-hotels.component.html',
  styleUrls: ['./favorite-hotels.component.css']
})
export class FavoriteHotelsComponent implements OnInit {
  favoriteHotels:Hotel[];
  isFetched:boolean = false;

  constructor( private route: ActivatedRoute,
    private hotelsSrv: HotelsService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.hotelsSrv.getFavoriteHotels()
      .pipe(take(1))
      .subscribe(favoriteHotels=>{
      this.favoriteHotels = favoriteHotels;
      console.log(favoriteHotels);
      this.isFetched = true;
      this.spinner.hide();
     
    },()=> this.spinner.hide())

  }

}
