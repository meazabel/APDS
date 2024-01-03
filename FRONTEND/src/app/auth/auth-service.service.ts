import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //makes the token private so it can't be accessed from outside
  private token !: string;

  constructor(private http: HttpClient) {
  }

  //register function that takes in username, password, and department
  register(username: string, password: string, department: string) {
    this.http.post('https://localhost:3000/api/users/register', {username: username, password: password, department: department})
      .subscribe(response => {

      });
  }

  //login function that takes in username and password
  login(username: string, password: string) {
    this.http.post<{ token: string }>('https://localhost:3000/api/users/login', {
      username: username,
      password: password
    })
      .subscribe(response => {
        this.token = response.token;
        alert('Login successful');
      }, error => {
        alert('Login unsuccessful');
      });
  }

  //returns the token
  getToken(){
    return this.token;
  }
}
