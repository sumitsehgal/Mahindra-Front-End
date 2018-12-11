import { LocalStorageService } from './../local-storage.service';
import { AuthCredentials, OauthToken } from './../models/api-types';
import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public email: string;
  public pass: string;

  public message: string;
  public messageStatus = false;

  constructor(private routes: Router, private api: ApiServiceService, private local: LocalStorageService) {
    if (this.api.currentUser) {
      this.routes.navigate(['home']);
    }
  }

  ngOnInit() {
  }

  validateLogin() {
    const authCred: AuthCredentials = {
      email: this.email,
      password: this.pass
    };

    this.api.signIn(authCred).subscribe((res: OauthToken) => {
      const tokenObject: OauthToken = res;
      // Set LocalStorage
      this.local.setStorage('tokenObject', JSON.stringify(tokenObject));
      this.api.currentUser = true;
      this.routes.navigate(['/', 'home']);
      return tokenObject;
    },
    err => {
      this.messageStatus = true;
      let errMsg = 'There is Some Internal Error';
      if (err.error) {
        if (err.message) {
          errMsg = err.message;
        }
        if (err.error.message) {
          errMsg = err.error.message;
        }
      }
      this.message = errMsg;
      return err;
    });
    return false;
  }

}
