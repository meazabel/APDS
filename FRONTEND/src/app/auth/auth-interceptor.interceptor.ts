import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // Add the token to the header of the request
  intercept(request: HttpRequest<unknown>, next: HttpHandler){
    const authToken = this.authService.getToken();
    const authRequest = request.clone({headers: request.headers.set('Authorization', "Bearer " + authToken)});
    return next.handle(authRequest);
  }
}
