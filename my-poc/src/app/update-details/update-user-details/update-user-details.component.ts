import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedInUsersService} from '../../logged-in-users/logged-in-users.service';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css'],
  providers: [LoggedInUsersService]
})
export class UpdateUserDetailsComponent implements OnInit {
  firstNameErrMsg: string;
  lastNameErrMsg: string;
  nationalityErrMsg: string;
  emailErrMsg: string;
  dobErrMsg: string;
  contactErrMsg: string;

  private headers = new Headers({'Content-Type': 'application/json'});
  userData: object = {};
  loggedInUsers = [];
  updatedData: object = {};
  rowIdToUpdateDetails: number;
  isUserDetailsUpdated: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loggedInService: LoggedInUsersService) {
  }

  ngOnInit() {
    this.firstNameErrMsg = 'Please enter your first name!';
    this.lastNameErrMsg = 'Please enter your last name!';
    this.nationalityErrMsg = 'Please enter your nationality!';
    this.emailErrMsg = 'Please enter your valid email!';
    this.dobErrMsg = 'Please enter your date of birth!';
    this.contactErrMsg = 'Please enter your valid contact number';

    this.activatedRoute.params.subscribe(params => {
      this.rowIdToUpdateDetails = +params['id'];
    });

    this.loggedInService.fetchLoggedInUsers().subscribe(users => {
      this.loggedInUsers = users;
      for (let i = 0; i < this.loggedInUsers.length; i++) {
        if (parseInt(this.loggedInUsers[i].id) === this.rowIdToUpdateDetails) {
          this.userData = this.loggedInUsers[i];
          break;
        }
      }
    });
  }

  onUpdate(updatedDetails: NgForm) {

    //here just setting the updated value to User type object this.updatedData
    // this.updatedData.fName = updatedDetails.value.fName;
    // this.updatedData.lName = updatedDetails.value.lName;
    // this.updatedData.dob = updatedDetails.value.dob;
    // this.updatedData.nationality = updatedDetails.value.nationality;
    // this.updatedData.email = updatedDetails.value.email;
    // this.updatedData.contact = updatedDetails.value.contact;

    this.updatedData = {
      'fName': updatedDetails.value.fName,
      'lName': updatedDetails.value.lName,
      'dob': updatedDetails.value.dob,
      'nationality': updatedDetails.value.nationality,
      'email': updatedDetails.value.email,
      'contact': updatedDetails.value.contact
    }

    //calling the update service
    let result = this.loggedInService.updateDetailsOfLoggedInUser(this.rowIdToUpdateDetails, this.updatedData);
    result.then(() =>{
      this.isUserDetailsUpdated = true;
      }, () => {
      this.isUserDetailsUpdated = false;
      }
    );
  }
}
