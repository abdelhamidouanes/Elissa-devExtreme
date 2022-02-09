import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SettingUserService {

  apiUrl = environment.apiUrl;
  
  private userInformation: any;
  userInformationSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) { 
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
      this.alertMsgService.setTitle('Erreur connexion.');
      this.alertMsgService.setMsg('Une erreur s\'est produite lors de chargement des données');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
