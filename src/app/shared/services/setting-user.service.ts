import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '.';
import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SettingUserService {

  apiUrl = environment.apiUrl;
  
  private userInformation: any;
  userInformationSubject : Subject<any>;

  constructor(private authService: AuthService, private httpClient: HttpClient, private cookieService: CookieService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) { 
    this.userInformationSubject = new Subject<any>();  
  }

  emitUserInformation(): void{
    this.userInformationSubject.next(this.userInformation);
  }

  async getUserInformation(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      let httpBody = new FormData();
      httpBody.append('apikey', this.cookieService.get('Apikey'));
      this.userInformation = await this.httpClient.post<any>(this.apiUrl+'admin/verify_apikey.php', httpBody).toPromise();
      this.emitUserInformation();
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async updateProfile(login: any, email: any): Promise<boolean>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('Apikey', this.cookieService.get('Apikey'));
        httpBody.append('Login', login);
        httpBody.append('email', email);
        httpBody.append('ID_User',  this.cookieService.get('Id'));
        await this.httpClient.post<any>(this.apiUrl+'user/update.php', httpBody).toPromise();
        this.alertMsgService.setTitle('Profile update done');
        this.alertMsgService.setMsg('Profile data has been updated..');
        this.alertMsgService.afficherDisplayAlertMsg();
        this.loadingService.cacherDisplayLoading();
        return true;
      }
      else{
        this.loadingService.cacherDisplayLoading();
        return false;
      }
    } catch (error) {
      this.alertMsgService.setTitle('Profile Update Error');
      this.alertMsgService.setMsg('An error occurred while updating profile data.');
      this.alertMsgService.afficherDisplayAlertMsg();
      this.loadingService.cacherDisplayLoading();
      return false;
    }
  }

  async changePassword(currentPassword: any, newPassword: any){
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('Apikey', this.cookieService.get('Apikey'));
        httpBody.append('Mot_De_Pass', currentPassword);
        httpBody.append('NewPassword', Md5.init(newPassword));
        await this.httpClient.post<any>(this.apiUrl+'user/change_password.php', httpBody).toPromise();
        this.alertMsgService.setTitle('Password updated');
        this.alertMsgService.setMsg('The password has been updated successfully.');
        this.alertMsgService.afficherDisplayAlertMsg();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Error password update');
      this.alertMsgService.setMsg('An error occurred while updating the password.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
