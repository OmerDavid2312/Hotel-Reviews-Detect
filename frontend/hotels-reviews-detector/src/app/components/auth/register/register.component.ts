import { Router } from "@angular/router";
import { User } from "./../../../models/User";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  user: User;
  email: string;
  password: string;
  name: string;
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
      !this.name ||
      this.email.trim() === "" ||
      this.password.trim() === "" ||
      this.name.trim() === ""
    ) {
      this.toastSrv.warning("Please fill out the form");
      return;
    }
    if (this.password.trim().length < 5) {
      this.toastSrv.warning("password must containt at least 5 characters");
      return;
    }
    this.spinner.show();

    this.user = { email: this.email, password: this.password, name: this.name };

    this.subscription$ = this.authSrv.registerUser(this.user).subscribe(
      (response) => {
        this.spinner.hide();
        this.toastSrv.success("You have successfully registered");
        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 1500);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
