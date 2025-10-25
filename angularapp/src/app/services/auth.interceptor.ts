import { Injectable } from '@angular/core';

import {

  HttpRequest,

  HttpHandler,

  HttpEvent,

  HttpInterceptor

} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    

    const jwtToken = localStorage.getItem('jwtToken');

    const username = localStorage.getItem('username');

    console.log("token->"+jwtToken);
    console.log("username->"+username);

    if (jwtToken && username) {

      

      request = request.clone({

        setHeaders: {

          Authorization: `Bearer ${jwtToken}`

        }

      });

    }

    return next.handle(request);

  }

}
 