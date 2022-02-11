import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';

@Injectable()
export class AuthService {

  private _user: any;
  userSubject : Subject<any>

  apiUrl = environment.apiUrl;

  get loggedIn(): boolean {
      return !!this.cookieService.get('Email');
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }
  constructor(private router: Router, private httpClient: HttpClient, private cookieService: CookieService) { 
    this.userSubject = new Subject<any>();
  }


  emitUser(): void{
    this.userSubject.next(this._user);
  }

  async verifyApiKey(){
    try {
      let httpBody = new FormData();
      httpBody.append('apikey', this.cookieService.get('Apikey'));
      let keyVerification = await this.httpClient.post<any>(this.apiUrl+'admin/verify_apikey.php', httpBody).toPromise();
  
      if(keyVerification.status == 'valid'){
        this._user = {
          email: keyVerification.Login,
          avatarUrl: './assets/img/userAvatar.png'
         };
        this.emitUser();
        return true;
      }
      else{
        this.logOut();
        return false;
      }
    }
    catch {
      this.logOut();
      return false;
    }
  }


  async logIn(email: string, password: string) {

    try {
      let httpBody = new FormData();
      httpBody.append('username', email);
      httpBody.append('password', password);
      let userData = await this.httpClient.post<any>(this.apiUrl+'admin/check_authentication.php', httpBody).toPromise();
     
      httpBody = new FormData();
      httpBody.append('apikey', userData.Apik);
      let keyVerification = await this.httpClient.post<any>(this.apiUrl+'admin/verify_apikey.php', httpBody).toPromise();
  
      if(keyVerification.status == 'valid'){
        this.cookieService.set('Login', keyVerification.Login);
        this.cookieService.set('Email', keyVerification.email);
        this.cookieService.set('Apikey', keyVerification.Apikey);
        this.cookieService.set('Id', userData.Id);
        this._user = {
                      email: keyVerification.Login,
                      avatarUrl: './assets/img/userAvatar.png'
                     };
        this.emitUser();
        this.router.navigate([this._lastAuthenticatedPath]);
  
        return {
          isOk: true,
          data: this._user
        };
      }
      else{
        return {
          isOk: false,
          message: "Authentication failed"
        };
      }
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }


  async getUser() {
    try {
      let httpBody = new FormData();
      httpBody.append('apikey', this.cookieService.get('Apikey'));
      let keyVerification = await this.httpClient.post<any>(this.apiUrl+'admin/verify_apikey.php', httpBody).toPromise();
      if(keyVerification.status == 'valid'){
        this._user = {
          email: keyVerification.Login,
          avatarUrl: './assets/img/userAvatar.png'
        };
        return {
          isOk: true,
          data: this._user
        };
      }
      else{
        return {
          isOk: false,
          data: null
        };
      }
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    this.emitUser();
    this.cookieService.delete('Email');
    this.cookieService.delete('Apikey');
    this.cookieService.delete('Login');
    this.cookieService.delete('Id');
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
