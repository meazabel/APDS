import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {AppComponent} from './app.component';
import {IssueCreateComponent} from './issue/issue-create/issue-create.component';
import {IssueDisplayComponent} from './issue/issue-display/issue-display.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor.interceptor";
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {ErrorComponent} from './error/error.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorInterceptor} from "./error/error.interceptor";
import {RegisterComponent} from './auth/register/register.component';
import {UsersDisplayComponent} from './users/users-display/users-display.component';
import {UsersNonVerifiedComponent} from './users/users-non-verified/users-non-verified.component';

// declarations: Components, Directives, and Pipes that belong to this NgModule
@NgModule({
  declarations: [
    AppComponent,
    IssueCreateComponent,
    IssueDisplayComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    UsersDisplayComponent,
    UsersNonVerifiedComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  // providers: Services that this NgModule contributes to the global collection of services
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
