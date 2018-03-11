import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private PROD_URL = 'https://echo.joshp.tech/api';
  private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'}); // changed from json to form
  constructor(private http: Http) { }
  login(user: User): Promise<any> {
    const url = `${this.PROD_URL}/login`;
    const userform = `username=${user.getUserName()}&password=${user.getUserPass()}`;
    return this.http.post(url, userform, {headers: this.headers}).toPromise();
  }
  register(user: User): Promise<any> {
    const url = `${this.PROD_URL}`;
    const userform = `username=${user.getUserName()}&password=${user.getUserPass()}`;
    return this.http.post(url, userform, {headers: this.headers}).toPromise();
  }
}
