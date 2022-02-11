import { AlertMsgService } from './alert-msg.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl = environment.apiUrl;

  private events: any;
  eventsSubject : Subject<any>;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.events=[];
    this.eventsSubject=new Subject<any>();
  }

  emitEvents(): void{
    this.eventsSubject.next(this.events);
  }

  async getEvents(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.events = await this.httpClient.get<any>(this.apiUrl+'events/read.php?Status=1&idProd=0&Version=0').toPromise();
        this.emitEvents();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getEventsWithoutVerifyApiKey(): Promise<void>{
    try {
      this.events = await this.httpClient.get<any>(this.apiUrl+'events/read.php?Status=1&idProd=0&Version=0').toPromise();
      this.emitEvents();
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
  }
  
  async editEvent(id:any,session_id:any,status:any,planning:any,event_date:any){
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('ID',id);
        httpBody.append('ID_Session',session_id);
        httpBody.append('Status',status);
        httpBody.append('Planning',planning);
        httpBody.append('Event_Date',event_date);
        const updateResponse =  await this.httpClient.post<any>(this.apiUrl+'events/update.php', httpBody).toPromise();
        if(updateResponse.status== true){
          this.alertMsgService.setTitle('Event updated.');
          this.alertMsgService.setMsg('The Event '+id+' was updated successfully.');
          this.alertMsgService.afficherDisplayAlertMsg();
          this.getEventsWithoutVerifyApiKey();
        }else{
          this.alertMsgService.setTitle('Update error.');
          this.alertMsgService.setMsg(updateResponse.message);
          this.alertMsgService.afficherDisplayAlertMsg();
        }
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }


  async deleteEvent(id: any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('ID',id);
        const deleteResponse = await this.httpClient.post<any>(this.apiUrl+'events/delete.php', httpBody).toPromise();
        if(deleteResponse.status== true){
          this.alertMsgService.setTitle('Event deleted.');
          this.alertMsgService.setMsg('The Event '+id+' was deleted successfully.');
          this.alertMsgService.afficherDisplayAlertMsg();
          this.getEventsWithoutVerifyApiKey();
        }else{
          this.alertMsgService.setTitle('Delete error.');
          this.alertMsgService.setMsg(deleteResponse.message);
          this.alertMsgService.afficherDisplayAlertMsg();
        }
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }
 

}
