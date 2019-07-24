import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoggedInUsersService} from '../logged-in-users/logged-in-users.service';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [LoggedInUsersService, SharedService]
})
export class RegistrationComponent implements OnInit {

  firstNameErrMsg: string;
  lastNameErrMsg: string;
  nationalityErrMsg: string;
  emailErrMsg: string;
  dobErrMsg: string;
  contactErrMsg: string;

  username: string;
  password: string;
  generatedUsername: string;

  isAddedNewUser: boolean;

  newlyAddedUser: Object = {};

  constructor(private loggedInService: LoggedInUsersService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.firstNameErrMsg = 'Please enter your first name!';
    this.lastNameErrMsg = 'Please enter your last name!';
    this.nationalityErrMsg = 'Please enter your nationality!';
    this.emailErrMsg = 'Please enter your valid email!';
    this.dobErrMsg = 'Please enter your date of birth!';
    this.contactErrMsg = 'Please enter your valid contact number';
  }

  onSubmit(newUser: NgForm) {
    console.log(newUser);
    this.newlyAddedUser = this.loggedInService.addNewUser(newUser.value).subscribe((response) => {
      this.isAddedNewUser = true;
      this.generatedUsername = this.sharedService.generatedUsername(newUser.value);
    });
  }
}
