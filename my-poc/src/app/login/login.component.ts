import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm, NgModelGroup} from '@angular/forms';
import {SharedService} from '../shared.service';
import {User} from './user';
import {LoggedInUsersService} from '../logged-in-users/logged-in-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoggedInUsersService]
})
export class LoginComponent implements OnInit, OnChanges {

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  @ViewChild('loginForm', {static: false}) userNameElementRef: ElementRef;
  @ViewChild('loginData', {static: false}) loginData: NgModelGroup;
  // @ViewChild('loginData') loginData: NgModelGroup;
  // username: string;
  // password: string;
  usernameErrorMsg: string;
  passwordErrorMsg: string;
  errorMsg: string;
  isValidUser: boolean;
  isUserForgetPassword: boolean;
  isNewUser: boolean;
  isLoggedInAsAdmin: boolean;

  users: User[] = [];
  currUser: User = new User();

  //@ViewChild('username') usernameElementRef: ElementRef;

  constructor(private route: Router,
              private sharedService: SharedService,
              private loggedInService: LoggedInUsersService,
              private activatedRoute: ActivatedRoute) {

    //constructor is used basically for instantiating services while all other initialization operations are done in
    //ngOnInit()
    console.log(this.users);
  }

  ngOnInit() {
    console.log('ngOnInit() method gets called!');

    this.loggedInService.fetchLoggedInUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });

    this.usernameErrorMsg = 'Please enter username !';
    this.passwordErrorMsg = 'Please enter password !';
    this.errorMsg = '';
    // this.userNameElementRef.nativeElement.focus();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges() method gets called!');
  }

  onLoginClick(form: NgForm) {
    console.log('onLoginClick() method gets called!');
    console.log('LoginForm as JSON : ' + form);
    this.currUser.username = this.loginForm.value.loginData.username; //here we set the entered username to our CurrUser bean
    this.currUser.password = this.loginForm.value.loginData.password; //here we set the entered password to our CurrUser bean

    this.isUserAuthenticated();

  }

  isUserAuthenticated() {
    console.log('LoginComponent : isUserAuthenticated gets called');
    let findUser: User = this.users.find((user) => user.username === this.currUser.username);
    if (findUser && findUser.username === 'Neha' && findUser.password === 'admin') {
      console.log('LoginComponent : admin');
      //navigate to logged-in-users page
      this.isLoggedInAsAdmin = true;
      this.sharedService.setLoggedInUser = true;
      this.sharedService.setLoggedInUsernameForDisplay(findUser.fName);
    } else if (findUser && findUser.password === this.currUser.password) {
      //navigate to dashboard page
      this.isValidUser = true;
      this.sharedService.setLoggedInUser = true;
      this.sharedService.setLoggedInUsernameForDisplay(findUser.fName); // set username in shared service
      this.route.navigate(['dashboard']); // navigate to Dashboard component
    } else if (findUser && !(findUser.password === this.currUser.password)) {
      //navigate to recover-login-credentials page
      // this.route.navigate(['recover-login-credentials'])
      this.isUserForgetPassword = true;
      this.errorMsg = 'Forget your password, please press click here button to recover your password';
    } else {
      //navigate to registration page
      // this.route.navigate(['registration'])
      this.isNewUser = true;
      this.errorMsg = 'Seems not a logged in user, please press Register here button for sign-up';
    }
  }

  onForgetPasswordClick() {
    console.log('LoginComponent : onForgetPasswordClick() !');
    this.route.navigate(['recover-credentials']);
  }

  onRegisterHereClick() {
    console.log('LoginComponent : onRegisterHereClick() !');
    this.route.navigate(['registration']);
  }

  onSeeLoggedInUsersClick() {
    this.route.navigate(['logged-in-users']);
  }
}
