import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  public static TAG: string = 'Login service : ';
  constructor(private http: HttpClient) {
    console.log(LoginService.TAG);
  }

  login() {
    // console.log(LoginService.TAG + this.http.get<any[]>('dummy-responses/login-data.json'));
    return this.http.get<any[]>('assets/login-data.json');
  }

}
