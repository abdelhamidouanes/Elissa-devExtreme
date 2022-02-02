import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCaseServiceService {
  apiUrl = environment.apiUrl;
  private testCases: any;
  testCasesSubject : Subject<any>;



  constructor(private httpClient: HttpClient, ) 
  { 
    this.testCases = [];
    this.testCasesSubject = new Subject<any>();
  }

  emitTestCases(): void{
    this.testCasesSubject.next(this.testCases);
  }

  async getTestCases(): Promise<void>{
    this.testCases = await this.httpClient.get<any>(this.apiUrl+'test/read.php?IdProd=31&Version=0&Status=1&index=0').toPromise();
    this.emitTestCases();
  }

  
 

}
