import { User } from "./../models/User";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseURL: string = "http://localhost:3000/api";

  private _isLoggedInSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$:Observable<boolean> = this._isLoggedInSubject.asObservable();
  
  constructor(private http: HttpClient) {

  }

  public registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/users/register`, user);
  }

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/users/login`, user);
  }

  public getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/users/`);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  public getToken(): String {
    return localStorage.getItem("token");
  }

  public setLoginState(){
    this._isLoggedInSubject.next(true);
  }

  public logout(): void {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this._isLoggedInSubject.next(false);
  }
}
