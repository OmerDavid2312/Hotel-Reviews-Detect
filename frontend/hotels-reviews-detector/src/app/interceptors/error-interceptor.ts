import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authSrv: AuthService,private router:Router,private toastSrv:ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authSrv.logout();
                this.router.navigateByUrl('/login');
            }
            const error = err.error.message ||  err.error.errors[0]['msg'] || err.statusText; 
            this.toastSrv.error(error);
            return throwError(error);
        }))
    }
}