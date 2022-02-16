import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '.';
import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportTotalTestCasesRunService {
  apiUrl = environment.apiUrl;

  private testRunStats: any
  testRunStatsSubject: Subject<any>;

  private testSessions: any
  testSessionsSubject: Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.testRunStats = [];
    this.testRunStatsSubject = new Subject<any>();   
    this.testSessions = [];
    this.testSessionsSubject = new Subject<any>();
  }

  emitTestRunStatsSubject(): void {
    this.testRunStatsSubject.next(this.testRunStats);
  }

  emitTestSessionsSubject(): void {
    this.testSessionsSubject.next(this.testSessions);
  }
  async getTestRunStats(Start_date: any, id_prod: any, id_vers: any, idsession: any, End_date: any): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if (await this.authService.verifyApiKey()) {
        let httpBody = new FormData();
        httpBody.append('Start_date', Start_date);
        httpBody.append('id_prod', id_prod);
        httpBody.append('id_vers', id_vers);
        httpBody.append('idsession', idsession);
        httpBody.append('End_date', End_date);
        this.testRunStats = await this.httpClient.post<any>(this.apiUrl + 'charts/charts_testRun_stats.php', httpBody).toPromise();
        this.emitTestRunStatsSubject();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }
  
  async getTestSession(id_prod: any, Version: any,from:any): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if (await this.authService.verifyApiKey()) {
        let httpBody = new FormData();
        httpBody.append('idProd', id_prod);
        httpBody.append('Version', Version);
        httpBody.append('from', from);
        this.testSessions = await this.httpClient.post<any>(this.apiUrl + 'testSession/read_only_liste.php?idProd='+id_prod+'&Version='+Version+'&from='+from, httpBody).toPromise();
        
        this.emitTestSessionsSubject();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }
}
