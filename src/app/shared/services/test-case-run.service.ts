import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService) {
    this.testCaseRun = [];
    this.testCaseRunSubject = new Subject<any>();
   }
   
  emittestCaseRun(): void{
    this.testCaseRunSubject.next(this.testCaseRun);
  }


  async getTestCaseRun(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    if(await this.authService.verifyApiKey()){
      this.testCaseRun = await this.httpClient.get<any>(this.apiUrl+'/testRun/read.php?status=0&idProd=0&Version=0&date=2021-01&analyseStatus=1&ResultSession=1&index=0').toPromise();
      this.emittestCaseRun();
    }
    this.loadingService.cacherDisplayLoading();
  }

  
}
