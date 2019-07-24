import {Injectable, OnInit} from '@angular/core';
import {User} from './login/user';

@Injectable()
export class SharedService implements OnInit{

  loggedInUsername: string = '';
  setLoggedInUser: boolean = false;

  ngOnInit(): void {
  }

  setLoggedInUsernameForDisplay(username: string) {
    this.loggedInUsername = username;
    console.log('Shared service loggedInUsername - ' + this.loggedInUsername);
  }

  getLoggedInUsername() {
    return this.loggedInUsername;
  }

  generatedUsername(userData: User) {
    return userData.lName.slice(0, 3) +
      userData.fName.slice(0, 3) +
      userData.dob.toString().slice(0, 2);
  }
}
