import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
 
  private history: any
  historySubject : Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.history = [];
    this.historySubject = new Subject<any>(); 
  }


  emithistory(): void{
    this.historySubject.next(this.history);
  }

  async getHistoryElissa(): Promise<void> {
    this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=Ellissa').toPromise();
    this.emithistory();
  }

  async getHistoryProjector(): Promise<void> {
    this.history = await this.httpClient.get<any>(this.apiUrl + 'history/read.php?origin=projeqtor').toPromise();
    this.emithistory();
  }
}