import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSrv.isLoggedIn$.subscribe(currentIsLoginState=>{
      console.log(currentIsLoginState);
      this.isLoggedIn = currentIsLoginState;
      if(this.isLoggedIn){
        this.name = localStorage.getItem('user');
      }
    })
  }

  logout() {
    this.authSrv.logout();
    this.router.navigateByUrl("/login");
  }
}
