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
  
  editEvent(id:any,session_id:any,status:any,planning:any,event_date:any){
    let httpBody = new FormData();
    httpBody.append('ID',id);
    httpBody.append('ID_Session',session_id);
    httpBody.append('Status',status);
    httpBody.append('Planning',planning);
    httpBody.append('Event_Date',event_date);
    let result =  this.httpClient.post<any>(this.apiUrl+'events/update.php', httpBody);
     return result;
  }
 

}
