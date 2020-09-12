import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from 'src/app/service/request/request.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loginError: boolean;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(user) {
    this.requestService.login(user).subscribe((data: any) => {
        this.cookieService.set('token', data.token);
        this.requestService.setToken(true);
        this.router.navigate(['']);
      },
      () => this.loginError = true
    );
  }
}


