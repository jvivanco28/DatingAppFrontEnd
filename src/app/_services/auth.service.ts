import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {handleError} from "../_rest/rest_utils";

@Injectable()
export class AuthService {

  private readonly BASE_URL = 'http://localhost:5000/api/auth/';
  private readonly STORAGE_KEY_TOKEN = 'token';

  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
  }

  login(model: any) {
    return this.http.post(this.BASE_URL + 'login', model, this.getRequestOptions()).map((response: Response) => {

      const user = response.json();

      if (user) {
        localStorage.setItem(this.STORAGE_KEY_TOKEN, user.tokenString);

        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodedToken);

        this.userToken = user.tokenString;
      }
    }).catch(handleError);
  }

  isLoggedIn() {
    // const token = localStorage.getItem(this.STORAGE_KEY_TOKEN);
    // return !!token;

    return tokenNotExpired(this.STORAGE_KEY_TOKEN);
  }

  register(model: any) {
    return this.http.post(this.BASE_URL + 'register', model, this.getRequestOptions())
      .catch(handleError);
  }

  logout() {
    this.userToken = null;
    localStorage.removeItem(this.STORAGE_KEY_TOKEN);
  }

  private getRequestOptions() {
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
