import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../service/request/request.service';
import {CookieService} from 'ngx-cookie-service';

declare var particlesJS: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public token: boolean;

  constructor(private requestService: RequestService, private cookieService: CookieService) { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', null);
    this.token = this.cookieService.check('token');
  }

  log_out() {
    this.requestService.setToken(false);
    this.cookieService.delete('token');
  }
}
