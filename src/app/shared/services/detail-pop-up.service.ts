import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailPopUpService {

  apiUrl = environment.apiUrl;

  private details: any;
  detailssSubject : Subject<any>;


  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) { 
    this.detailssSubject = new Subject<any>();
  }

  emitDetails(): void{
    this.detailssSubject.next(this.details);
  }

  async getDetails(page: any, id: any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        switch(page) { 
          case 'products-components': { 
            this.details = await this.httpClient.get<any>(this.apiUrl+'product/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          } 
          case 'products-components-detail': { 
            this.details = await this.httpClient.get<any>(this.apiUrl+'product/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'products-components-versions': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'version/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'products-components-versions-detail': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'version/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'test-cases': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'test/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'test-case-runs-analysis': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'issues/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'test-case-run-sous-details': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'testRun/read_single.php?ID_Run='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'events': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'events/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'events-product-detail': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'product/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'delivery': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'delivery/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          }
          case 'test-session': {
            this.details = await this.httpClient.get<any>(this.apiUrl+'testSession/read_single.php?ID='+id).toPromise();
            this.emitDetails();
            break; 
          } 
        }
      }
    } catch (error) {
      this.alertMsgService.setTitle('Erreur connexion.');
      this.alertMsgService.setMsg('Une erreur s\'est produite lors de chargement des données');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

}
