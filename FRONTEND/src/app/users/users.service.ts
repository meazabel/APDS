import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

//decorator that marks a class as available to be provided and injected as a dependency.
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //the usersDisplay is an array of objects that will be displayed in the users tab
  private usersDisplay: {
    _id: string,
    username: string,
    password: string,
    department: string,
    isAdmin: boolean,
    isVerified: boolean,
    _v: string
  }[] = [];

  //the updatedUsersDisplay is a subject that will be updated when the usersDisplay is updated
  private updatedUsersDisplay = new Subject<{
    _id: string,
    username: string,
    password: string,
    department: string,
    isAdmin: boolean,
    isVerified: boolean,
    _v: string
  }[]>();


  //the constructor is used to inject the HttpClient
  constructor(private http: HttpClient) {
  }

  //get all the users from the backend and store them in the usersDisplay array
  getUsersService() {
    this.http.get<{ message: string, users: any }>('https://localhost:3000/api/admin/all-users')
      .subscribe((theUser) => {
        this.usersDisplay = theUser.users;
        this.updatedUsersDisplay.next([...this.usersDisplay]);
      })
  }

  //get all the non verified users from the backend and store them in the usersDisplay array
  getNonVerifiedUsersService() {
    this.http.get<{ message: string, users: any }>('https://localhost:3000/api/admin/non-verified-users')
      .subscribe((theUser) => {
        this.usersDisplay = theUser.users;
        this.updatedUsersDisplay.next([...this.usersDisplay]);
      })
  }

  //verify a user by sending a post request to the backend
  verifyUserService(userId: string) {
    // @ts-ignore
    this.http.post('https://localhost:3000/api/admin/verify-user/' + userId)
      .subscribe(() => {
        this.usersDisplay = this.usersDisplay.filter(user => user._id !== userId);
        this.updatedUsersDisplay.next([...this.usersDisplay]);
      });
    alert("User Verified, refresh and check the users tab")
  }

  //delete a user by sending a delete request to the backend
  deleteUserService(userId: string) {
    this.http.delete('https://localhost:3000/api/admin/delete-user/' + userId)
      .subscribe(() => {
        this.usersDisplay = this.usersDisplay.filter(user => user._id !== userId);
        this.updatedUsersDisplay.next([...this.usersDisplay]);
      });
    alert("User Deleted, refresh and check the users tab")
  }

  //get the updatedUsersDisplay subject
  getUpdateListener() {
    return this.updatedUsersDisplay.asObservable();
  }
}
