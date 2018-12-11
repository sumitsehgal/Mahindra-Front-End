import { AuthCredentials, UserSession, OauthToken } from './models/api-types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  static readonly CLIENT_SECRET = 'PJf6OCsTlG5fvMYA9uti3eSPow9dqQvPMLhR9FFx';
  static readonly BASE_URL = 'http://mahindralocal.com/';
  currentUser = false;


  constructor(public http: HttpClient, private routes: Router, private local: LocalStorageService) {
    const tObj = this.parsedTokenObject(this.local.getStorage('tokenObject'));
    if (tObj && tObj.access_token) {
      this.currentUser = true;
    } else {
      this.currentUser = false;
      this.routes.navigate(['/', 'login']);
    }
  }

  parsedTokenObject(object: string) {
    const tokenObject: OauthToken = JSON.parse(object);
    return tokenObject;
  }

  signIn(credentials: AuthCredentials): any {
    const authenticate = () => {
      const body = {
        grant_type: 'password',
        client_id: 2,
        client_secret: ApiServiceService.CLIENT_SECRET,
        username: credentials.email,
        password: credentials.password,
        scope: ''
      };
      return this.http.post(ApiServiceService.BASE_URL + 'oauth/token', body, this.getRequestOptions());
    };
    return authenticate();

  }

  getRequestOptions(mergeHeaders?: HttpHeaders, skipContentType?: boolean) {
    let headers = new HttpHeaders();
    if (!skipContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }
    if (mergeHeaders) {
      for (const key of mergeHeaders.keys()) {
        headers = headers.set(key, mergeHeaders.get(key)); 	// override or add merged headers
      }
    }
    return { headers };
  }
}
