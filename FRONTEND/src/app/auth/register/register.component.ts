import { Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  // Calls the register function in the auth service
  onRegister(registerForm: NgForm) {
    this.authService.register(registerForm.value.enteredUsername, registerForm.value.enteredPassword, registerForm.value.enteredDepartment);
    registerForm.resetForm();
    alert('Registration successful, you will be able to login once you have been verified by an admin')
  }
}
