import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TestSessionService {

  apiUrl = environment.apiUrl;

  private testSessions: any[];
  testSessionsSubject : Subject<any>;

  constructor(private httpClient: HttpClient) {
    this.testSessions = [];
    this.testSessionsSubject = new Subject<any>();

  }

  emitTestSessions(): void{
    this.testSessionsSubject.next(this.testSessions);
  }


  async getTestSessions(date:any): Promise<void>{
    this.testSessions = await this.httpClient.get<any>(this.apiUrl+'testSession/read.php?idProd=0&Version=0&date='+date+'&ListStatus=1&from=table&index=0').toPromise();
    this.emitTestSessions();
  }

}
