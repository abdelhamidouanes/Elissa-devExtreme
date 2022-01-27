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

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService) {
    this.events=[];
    this.eventsSubject=new Subject<any>();
  }

  emitEvents(): void{
    this.eventsSubject.next(this.events);
  }

  async getEvents(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    if(await this.authService.verifyApiKey()){
      this.events = await this.httpClient.get<any>(this.apiUrl+'events/read.php?Status=1&idProd=0&Version=0').toPromise();
      this.emitEvents();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
