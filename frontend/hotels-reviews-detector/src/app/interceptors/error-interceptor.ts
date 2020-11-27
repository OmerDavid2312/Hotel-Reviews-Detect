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

            const error = err.error.message ||  err.error.errors[0]['msg'] || err.statusText;
            this.handleErrStatus(err,error);
            return throwError(error);
        }))
    }

    protected handleErrStatus(err,error){
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authSrv.logout();
            this.router.navigateByUrl('/login');
        }
        if(err.status === 404){
            this.router.navigateByUrl('/');
        }

        if(Number(err.status.toString()[0]) === 5 ){ //server error
            this.toastSrv.error(error);
        }else if(err.status === 401){ //unauthorize
            this.toastSrv.error(error);
        }else if (Number(err.status.toString()[0]) === 4 ){ //client error (not found, etc ..)
            this.toastSrv.warning(error);
        }
    }
}