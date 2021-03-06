import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {User} from "../_models/User";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify.service";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers()
      .catch(error => {
        console.log(error);

        this.alertify.error('Error retrieving data.');
        this.router.navigate(['/home']);

        return Observable.of(null);
      });
  }
}
