import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ErrorComponent} from "./error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  // Intercepts all http requests and handles errors
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        // Check if the error occurred during an HTTP request

        return throwError(error);
      })
    );
  }
}
