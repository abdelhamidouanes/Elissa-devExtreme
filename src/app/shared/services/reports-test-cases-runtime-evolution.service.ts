import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '.';
import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsTestCasesRuntimeEvolutionService {

  private data: any
  dataSubject : Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) { 
    this.data = [];
    this.dataSubject = new Subject<any>(); 
  }

  emitData(): void{
    this.dataSubject.next(this.data);
  }

  async getData(): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('Id_Test', '0');
        httpBody.append('ID_prod', '0');
        httpBody.append('Id_version', '0');
        this.data = await this.httpClient.post<any>(this.apiUrl + 'charts/charts_RuntimeTestCase.php', httpBody).toPromise();
        this.emitData();
      }      
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }


}
