import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form = {
    email: '',
    name: null,
    password: null,
    password_confirmation: null
  };

  public error: {
    name?: string,
    email?: string,
    password?: string
  } = {};

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): Subscription {
    return this.auth.register(this.form).subscribe(data => {
      this.handleResponse(data);
    }, error => {
      this.handleError(error);
    });
  }

  handleResponse(data):void {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('home');
  }

  handleError(error): void {
    this.error = error.error.errors;
  }
}
