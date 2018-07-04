import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {User} from "../_models/User";
import {handleError} from "../_rest/rest_utils";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {
  }

  getUsers(): Observable<User[]> {
    return this.authHttp.get(this.baseUrl + 'users')
      .map(response => <User[]>response.json())
      .catch(handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(response => <User>response.json())
      .catch(handleError);
  }
}
