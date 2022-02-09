import { AlertMsgService } from './alert-msg.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  apiUrl = environment.apiUrl;
  private testCases: any;
  testCasesSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) 
  { 
    this.testCases = [];
    this.testCasesSubject = new Subject<any>();
  }

  emitTestCases(): void{
    this.testCasesSubject.next(this.testCases);
  }

  async getTestCases(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.testCases = await this.httpClient.get<any>(this.apiUrl+'test/read.php?IdProd=0&Version=0&Status=1&index=0').toPromise();
        this.emitTestCases();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Erreur connexion.');
      this.alertMsgService.setMsg('Une erreur s\'est produite lors de chargement des données');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
