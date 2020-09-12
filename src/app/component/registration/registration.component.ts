import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passValidator} from './validator';
import {RequestService} from '../../service/request/request.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RequestService]
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  public formValid = {
    invalid: false,
    message: ''
  };

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: '',
      cnfPass: ['', passValidator]
    });

    this.form.controls.password.valueChanges.subscribe(
      x => {
        this.form.controls.cnfPass.updateValueAndValidity();
      }
    );
  }

  onSubmit(user) {
    if (this.form.valid) {
      this.requestService.register(user).subscribe((data: any) => {
          this.cookieService.set('token', data.token);
          this.requestService.setToken(true);
          this.router.navigate(['']);
        },
        e => {
          this.formValid.invalid = true;
          this.formValid.message = e.error;
        }
      );
    }
  }
}
