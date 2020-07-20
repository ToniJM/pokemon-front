import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token): void {
    this.set(token);
  }

  set(token): void {
    console.log(token);
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'))
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.iss.includes(environment.apiUrl) ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload =  token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
