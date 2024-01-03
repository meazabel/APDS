import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // Login function
  onLogin(loginForm: NgForm) {
    this.authService.login(loginForm.value.enteredUsername, loginForm.value.enteredPassword);
    loginForm.resetForm();
    this.router.navigate(['/']);
  }
}
