import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(value => {
      this.alertify.success('logged in successfully');
      this.router.navigate(['/members'])

    }, error => {
      console.log(error);
      this.alertify.error('Failed to login.');
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.alertify.message('logged in successfully');
    this.router.navigate(['/home']);
  }
}
