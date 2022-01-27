import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TestCaseRunsAnalysisService {
  apiUrl = environment.apiUrl;
  
  private  testCaseRunsAnalysis:any;
  testCaseRunsAnalysisSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.testCaseRunsAnalysis = [];
    this.testCaseRunsAnalysisSubject = new Subject<any>();
  }

  emitTestCaseRunsAnalysis(): void{
    this.testCaseRunsAnalysisSubject.next(this.testCaseRunsAnalysis);
  }

  async getTestCaseRunsAnalysis(): Promise<void>{
    if(await this.authService.verifyApiKey()){
      this.testCaseRunsAnalysis = await this.httpClient.get<any>(this.apiUrl+'issues/read.php?ID_Product=0&Status=1&Version=0&Type=0&Index=0').toPromise();
      this.emitTestCaseRunsAnalysis();
    }
  }
}
