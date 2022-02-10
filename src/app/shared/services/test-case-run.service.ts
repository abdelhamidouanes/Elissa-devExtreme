import { AlertMsgService } from './alert-msg.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class TestCaseRunService {

  apiUrl = environment.apiUrl;

  private testCaseRun: any;
  testCaseRunSubject : Subject<any>;
  date : any ;
 

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.testCaseRun = [];
    this.testCaseRunSubject = new Subject<any>();
   }
   
  emittestCaseRun(): void{
    this.testCaseRunSubject.next(this.testCaseRun);
  }


  async getTestCaseRun(date : any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.testCaseRun = await this.httpClient.get<any>(this.apiUrl+'/testRun/read.php?status=0&idProd=0&Version=0&date='+date+'&analyseStatus=1&ResultSession=1&index=0').toPromise();
        this.emittestCaseRun();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }
 
  
}
