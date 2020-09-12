import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {AuthGuard} from './guard/authorization/auth.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './component/home/modal/modal.component';
import {GameComponent} from './component/game/game.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameModule} from './component/game/game.module';
import {RequestService} from './service/request/request.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {MatSortModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import {StatisticService} from './service/statistic/statistic.service';
import {KeyInterceptors} from './service/interseptor/key-interseptor.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MainComponent} from './component/main/main.component';

const routes = [
  {path: '', component: MainComponent},
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ModalComponent,
    GameComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    GameModule,
    BrowserAnimationsModule,
    MatSortModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  entryComponents: [ModalComponent],
  providers: [
    AuthGuard,
    RequestService,
    StatisticService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeyInterceptors,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
