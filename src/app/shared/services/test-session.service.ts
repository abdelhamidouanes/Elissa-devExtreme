import { AlertMsgService } from './alert-msg.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})

export class TestSessionService {

  apiUrl = environment.apiUrl;

  private testSessions: any[];
  testSessionsSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.testSessions = [];
    this.testSessionsSubject = new Subject<any>();

  }

  emitTestSessions(): void{
    this.testSessionsSubject.next(this.testSessions);
  }


  async getTestSessions(date:any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.testSessions = await this.httpClient.get<any>(this.apiUrl+'testSession/read.php?idProd=0&Version=0&date='+date+'&ListStatus=1&from=table&index=0').toPromise();
        this.emitTestSessions();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Erreur connexion.');
      this.alertMsgService.setMsg('Une erreur s\'est produite lors de chargement des données');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
   this.loadingService.cacherDisplayLoading();
  }

}
