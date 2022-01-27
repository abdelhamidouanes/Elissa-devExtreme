import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestCaseServiceService {
  apiUrl = environment.apiUrl;
  private testCases: any;
  testCasesSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService) 
  { 
    this.testCases = [];
    this.testCasesSubject = new Subject<any>();
  }

  emitTestCases(): void{
    this.testCasesSubject.next(this.testCases);
  }

  async getTestCases(): Promise<void>{
    if(await this.authService.verifyApiKey()){
      this.testCases = await this.httpClient.get<any>(this.apiUrl+'test/read.php?IdProd=31&Version=0&Status=1&index=0').toPromise();
      this.emitTestCases();
    }
  }

}
