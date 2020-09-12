import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import key from './key';

@Injectable({
  providedIn: 'root'
})
export class KeyInterceptors implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set('Api-Header', key)
    });
    return next.handle(request);
  }

  constructor() {
  }
}
