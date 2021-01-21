import { User } from "./../../../models/User";
import { Router } from "@angular/router";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  email: string;
  password: string;
  constructor(
    private authSrv: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastSrv: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      !this.email ||
      !this.password ||
      this.email.trim() === "" ||
      this.password.trim() === ""
    ) {
      this.toastSrv.warning("Please fill out the form");
      return;
    }
    if (this.password.trim().length < 5) {
      this.toastSrv.warning("password must containt at least 5 characters");
      return;
    }
    this.spinner.show();
    this.user = { email: this.email, password: this.password };

     this.authSrv.loginUser(this.user)      
     .pipe(take(1))
     .subscribe(
      (response) => {
        //store token
        localStorage.setItem("token", response.token);
        //store username
        localStorage.setItem("user", response.user);
        this.spinner.hide();
        this.toastSrv.success("You have successfully logged in");
        setTimeout(() => {
          this.router.navigateByUrl("/");
        }, 2000);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

}
