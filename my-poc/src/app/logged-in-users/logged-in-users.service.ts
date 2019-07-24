import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

// import  'rxjs/add/operator/toPromise';


@Injectable()
export class LoggedInUsersService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  newUserDataObj: Object = {};
  username: string;
  defaultPwd: string;

  constructor(private http: HttpClient) {
  }

  /*
  This method is used to fetching the logged-in-users list
   */
  fetchLoggedInUsers() {
    console.log('LoggedInService : fetchLoggedInUsers() called!');
    return this.http.get<any[]>('http://localhost:5555/loggedUsers');
  }

  updateDetailsOfLoggedInUser(id: number, updatedDetails: object) {
    console.log('LoggedInService : updateDetailsOfLoggedInUser() called!');
    const url = `${'http://localhost:5555/loggedUsers'}/${id}`;
    return this.http.put(url, JSON.stringify(updatedDetails), {headers: this.headers})
      .toPromise().then(() => {
        return true;
      }, () => {
        return false;
      });
  }

  /*
  This is adding new registered user to logged-in-users.json
   */
  addNewUser(newUserData) {
    console.log('LoggedInService : addNewUser() called!');
    //generating username
    this.username = newUserData.lName.slice(0, 3) +
      newUserData.fName.slice(0, 3) +
      newUserData.dob.toString().slice(0, 2);
    console.log('LoggedInService : username = ' + this.username);

    //set default password for user first-time
    this.defaultPwd = 'abc';

    //creating object that stores new user data and post it to server for adding new user data.
    this.newUserDataObj = {
      'username': this.username,
      'password': this.defaultPwd,
      'fName': newUserData.fName,
      'lName': newUserData.lName,
      'dob': newUserData.dob,
      'nationality': newUserData.nationality,
      'email': newUserData.email,
      'contact': newUserData.contact
    };

    //making post request
    return this.http.post('http://localhost:5555/loggedUsers/', this.newUserDataObj);
  }

  /*
  This is deleting the logged-in-user
   */
  deleteLoggedInUser(rowIdToDelete) {
    console.log('LoggedInService : deleteUser() called!');
    if (confirm('Are you sure ?')) {
      const url = `${'http://localhost:5555/loggedUsers'}/${rowIdToDelete}`;
      return this.http.delete(url, {headers: this.headers}).toPromise().then(() => {
        this.fetchLoggedInUsers();
      });
    }
  }
}
