import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../users.service";

//decorator - metadata
@Component({
  selector: 'app-users-non-verified',
  templateUrl: './users-non-verified.component.html',
  styleUrls: ['./users-non-verified.component.css']
})
export class UsersNonVerifiedComponent implements OnInit {
  users: {
    _id: string,
    username: string,
    password: string,
    department: string,
    isAdmin: boolean,
    isVerified: boolean,
    _v: string
  }[] = [];

  //dependency injection
  constructor(public usersService: UsersService) {
  }

  //subscribe to the changes in the users array
  private usersSubscription!: Subscription;

  ngOnInit() {
    //get the non verified users from the database
    this.usersService.getNonVerifiedUsersService();
    //subscribe to the changes in the users array
    this.usersSubscription = this.usersService.getUpdateListener()
      .subscribe((users: {
        _id: string,
        username: string,
        password: string,
        department: string,
        isAdmin: boolean,
        isVerified: boolean,
        _v: string
      }[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  //delete user
  onDelete(userId: string) {
    this.usersService.deleteUserService(userId);
  }

  //verify user
  onVerify(userId: string) {
    this.usersService.verifyUserService(userId);
  }
}
