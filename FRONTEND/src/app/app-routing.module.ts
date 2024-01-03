import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {NgModule} from "@angular/core";
import {IssueDisplayComponent} from "./issue/issue-display/issue-display.component";
import {IssueCreateComponent} from "./issue/issue-create/issue-create.component";
import {RegisterComponent} from "./auth/register/register.component";
import {UsersDisplayComponent} from "./users/users-display/users-display.component";
import {UsersNonVerifiedComponent} from "./users/users-non-verified/users-non-verified.component";

//All the routes for the application
const routes: Routes = [
  {path: '', component: IssueDisplayComponent},
  {path: 'add', component: IssueCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersDisplayComponent},
  {path: 'non-verified-users', component: UsersNonVerifiedComponent},
];

//Export the routes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
