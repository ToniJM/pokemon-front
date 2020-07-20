import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  public authStatus = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  register(data) {
    return this.http.post(environment.apiUrl + 'register', data);
  }

  login(data) {
    return this.http.post(environment.apiUrl + 'login', data);
  }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
}
