import { AlertMsgService } from './alert-msg.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
 
  private history: any
  historySubject : Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.history = [];
    this.historySubject = new Subject<any>(); 
  }


  emithistory(): void{
    this.historySubject.next(this.history);
  }

  async getHistoryElissa(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=Ellissa').toPromise();
        this.emithistory();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getHistoryProjector(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=projeqtor').toPromise();
        this.emithistory();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getHistoryLogs(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.history = [];
        this.emithistory();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}