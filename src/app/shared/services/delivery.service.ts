import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
 
  private deliverys: any
  deliverisSubject : Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.deliverys = [];
    this.deliverisSubject = new Subject<any>(); 
  }


  emitDeliveris(): void{
    this.deliverisSubject.next(this.deliverys);
  }

  async getdeliverys(): Promise<void> {
    this.deliverys = await this.httpClient.get<any>(this.apiUrl + 'delivery/read.php').toPromise();
    this.emitDeliveris();
  }

}