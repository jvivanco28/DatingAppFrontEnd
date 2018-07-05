import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {handleError} from "../_rest/rest_utils";
import {User} from "../_models/User";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AuthService {

  private readonly BASE_URL = 'http://localhost:5000/api/auth/';
  private readonly STORAGE_KEY_TOKEN = 'token';
  private readonly STORAGE_KEY_USER = 'user';

  userToken: any;
  decodedToken: any;
  currentUser: User;
  jwtHelper: JwtHelper = new JwtHelper();

  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: Http) {
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.BASE_URL + 'login', model, this.getRequestOptions()).map((response: Response) => {

      const user = response.json();

      if (user) {
        localStorage.setItem(this.STORAGE_KEY_TOKEN, user.tokenString);
        localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(user.user));

        this.currentUser = user.user;
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodedToken);

        this.userToken = user.tokenString;

        this.changeMemberPhoto(this.currentUser.photoUrl)
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
    this.currentUser = null;

    localStorage.removeItem(this.STORAGE_KEY_TOKEN);
    localStorage.removeItem(this.STORAGE_KEY_USER);
  }

  private getRequestOptions() {
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
