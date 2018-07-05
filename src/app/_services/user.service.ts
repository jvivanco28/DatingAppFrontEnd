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

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user)
      .catch(handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(response => <User>response.json())
      .catch(handleError);
  }

  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + ' /photos/' + id + '/setMain', {})
      .catch(handleError);
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userId + ' /photos/' + id).catch(handleError);
  }
}
