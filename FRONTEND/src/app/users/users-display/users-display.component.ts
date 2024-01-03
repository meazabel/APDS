import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../users.service";

//decorator - metadata
@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit{
  users:{_id: string,
    username: string,
    password: string,
    department: string,
    isAdmin: boolean,
    isVerified: boolean,
    _v: string}[] = [];

  //dependency injection
  constructor(public usersService:UsersService) { }

  //subscribe to the changes in the users array
  private usersSubscription!: Subscription;

  ngOnInit() {
    //get all users from the database
    this.usersService.getUsersService();

    //subscribe to the changes in the users array
    this.usersSubscription = this.usersService.getUpdateListener()
      .subscribe((users:{_id: string,
        username: string,
        password: string,
        department: string,
        isAdmin: boolean,
        isVerified: boolean,
        _v: string}[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  //delete user
  onDelete(userId:string){
    this.usersService.deleteUserService(userId);
  }

  //verify user
  onVerify(userId:string){
    this.usersService.verifyUserService(userId);
  }
}
