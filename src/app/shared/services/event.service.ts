import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl = environment.apiUrl;

  private events: any;
  eventsSubject : Subject<any>;
  private event:any;

  constructor(private httpClient: HttpClient) {
    this.events=[];
    this.eventsSubject=new Subject<any>();
  }

  emitEvents(): void{
    this.eventsSubject.next(this.events);
  }

  async getEvents(): Promise<void>{
    this.events = await this.httpClient.get<any>(this.apiUrl+'events/read.php?Status=1&idProd=0&Version=0').toPromise();
    this.emitEvents();
  }
  async getEvent(Id: any): Promise<void>{
    this.event = await this.httpClient.get<any>(this.apiUrl+'events/read_single.php?ID'+Id).toPromise();
  }

}
