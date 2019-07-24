import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../shared.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-recover-login-credentials',
  templateUrl: './recover-login-credentials.component.html',
  styleUrls: ['./recover-login-credentials.component.css']
})
export class RecoverLoginCredentialsComponent implements OnInit {

  @ViewChild('recoverCredentialForm', {static: false}) recoverCredentialForm: NgForm;
  // @ViewChild('secretAns', {static: false}) secretAns: ElementRef;
  loggedInUsername: string;

  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loggedInUsername = this.sharedService.getLoggedInUsername();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log('RecoverLoginCredentialsComponent : onSubmit button clicked!');

  }

}
