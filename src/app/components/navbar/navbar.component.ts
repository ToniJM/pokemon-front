import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe( value => this.loggedIn = value );
  }

  logout(event: MouseEvent) {
      event.preventDefault();
      this.auth.changeAuthStatus(false);
      this.token.remove();
      this.router.navigateByUrl('/login');
  }
}
