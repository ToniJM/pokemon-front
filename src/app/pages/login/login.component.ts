import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): Subscription {
    return this.auth.login(this.form).subscribe(data => {
      this.handleResponse(data);
    }, error => {
      this.handleError(error);
    });
  }

  handleResponse(data): void {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('home');
  }

  handleError(error): void {
    this.error = error.error.error;
  }
}
