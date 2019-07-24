import {Component, OnInit} from '@angular/core';
import {LoggedInUsersService} from './logged-in-users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logged-in-users',
  templateUrl: './logged-in-users.component.html',
  styleUrls: ['./logged-in-users.component.css'],
  providers: [LoggedInUsersService]
})
export class LoggedInUsersComponent implements OnInit {

  loggedUsers = [];
  id: number;

  constructor(private loggedInService: LoggedInUsersService,
              private router: Router) {
  }

  ngOnInit() {
    console.log('LoggedInUsersComponent : ngOnInit()!');
    this.loggedInService.fetchLoggedInUsers().subscribe((loggedUsers) => {
      this.loggedUsers = loggedUsers;
    });
  }

  onDelete(rowIdToDelete: number) {
    console.log('LoggedInUsersComponent : onDelete()!');
    let result = this.loggedInService.deleteLoggedInUser(rowIdToDelete);
    result.then(() => {
      console.log('LoggedInUsersComponent onDelete() onFulFilled');
      window.location.reload(); //need to check whether this approach is correct or not
    });
  }
}

