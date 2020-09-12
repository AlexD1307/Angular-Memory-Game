import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameService } from '../game/game.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public token: BehaviorSubject<boolean>;
  private requestURL = 'http://localhost:3000/api/';
  public statisticId;

  constructor(private http: HttpClient, private cookieService: CookieService, private gameServeice: GameService) {
    this.token = new BehaviorSubject<boolean>(this.cookieService.check('token'));

  }

  setToken(isAuth): void {
    this.token.next(isAuth);
  }

  getToken(): Observable<boolean> {
    return this.token.asObservable();
  }

  getStatistic() {
    const token = new HttpHeaders().set('Authorization', this.cookieService.get('token'));
    return this.http.get(`${this.requestURL}game_statistics`, { headers: token });
  }

  startGame(body) {
    const token = new HttpHeaders().set('Authorization', this.cookieService.get('token'));
    return this.http.post(`${this.requestURL}game_statistics`, body, { headers: token });
  }

  gameOver(id) {
    const token = new HttpHeaders().set('Authorization', this.cookieService.get('token'));
    const body = {
      number_of_attempts: this.gameServeice.moves,
      number_of_removed_cards: this.gameServeice.flippedCards
    };
    return this.http.put(`${this.requestURL}game_statistics/${id}`, body, { headers: token });
  }

  register(user) {
    const body = {
      email: user.email,
      password: user.password,
      password_confirmation: user.cnfpass
    };
    return this.http.post(`${this.requestURL}signup`, body);
  }

  login(user) {
    const body = {
      email: user.email,
      password: user.password,
    };
    return this.http.post(`${this.requestURL}login`, body);
  }
}
