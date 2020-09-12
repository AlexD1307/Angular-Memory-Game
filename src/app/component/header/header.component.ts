import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from 'src/app/service/request/request.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public burgerIsClicked: boolean;
  public token: boolean;

  constructor(private cookieService: CookieService, private requestService: RequestService, private router: Router) {
  }

  ngOnInit() {
    this.burgerIsClicked = false;
    this.token = this.cookieService.check('token');
    this.requestService.getToken().subscribe(token => this.token = token);
    this.routeEvent(this.router);
  }

  burgerClick(e) {
    e.preventDefault();
    this.burgerIsClicked = !this.burgerIsClicked;
    const navLink = document.querySelectorAll('.menu-nav');
    navLink.forEach(i => i.classList.toggle('nav_activate'));
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.urlAfterRedirects === '/') {
          this.token = true;
        }
      }
    });
  }

  log_out() {
    this.router.navigate(['login']);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.urlAfterRedirects === '/login') {
          this.requestService.setToken(false);
          this.cookieService.delete('token');
        }
      }
    });
  }
}
