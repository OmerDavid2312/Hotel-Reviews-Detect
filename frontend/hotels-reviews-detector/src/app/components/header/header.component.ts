import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLoggedIn:boolean = false
  name:string;
  constructor(private authSrv:AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authSrv.isLoggedIn(); // change..
    this.authSrv.getUserDetails().subscribe(res=>{
      this.name = res.name;      
    })
  }

}
