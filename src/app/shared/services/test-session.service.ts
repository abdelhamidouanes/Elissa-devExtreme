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

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService) {
    this.testSessions = [];
    this.testSessionsSubject = new Subject<any>();

  }

  emitTestSessions(): void{
    this.testSessionsSubject.next(this.testSessions);
  }


  async getTestSessions(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    if(await this.authService.verifyApiKey()){
      this.testSessions = await this.httpClient.get<any>(this.apiUrl+'testSession/read.php?idProd=0&Version=0&date=2021-01&ListStatus=1&from=table&index=0').toPromise();
      this.emitTestSessions();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
