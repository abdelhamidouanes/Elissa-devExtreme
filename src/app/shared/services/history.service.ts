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

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService) {
    this.history = [];
    this.historySubject = new Subject<any>(); 
  }


  emithistory(): void{
    this.historySubject.next(this.history);
  }

  async getHistoryElissa(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    if(await this.authService.verifyApiKey()){
      this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=Ellissa').toPromise();
      this.emithistory();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getHistoryProjector(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    if(await this.authService.verifyApiKey()){
      this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=projeqtor').toPromise();
      this.emithistory();
    }
    this.loadingService.cacherDisplayLoading();
  }
}