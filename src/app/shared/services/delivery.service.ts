import { AlertMsgService } from './alert-msg.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
 
  private deliverys: any
  deliverisSubject : Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) {
    this.deliverys = [];
    this.deliverisSubject = new Subject<any>(); 
  }


  emitDeliveris(): void{
    this.deliverisSubject.next(this.deliverys);
  }

  async getDeliverys(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.deliverys = await this.httpClient.get<any>(this.apiUrl + 'delivery/read.php').toPromise();
        this.emitDeliveris();
      }      
    } catch (error) {
      this.alertMsgService.setTitle('Erreur connexion.');
      this.alertMsgService.setMsg('Une erreur s\'est produite lors de chargement des données');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}