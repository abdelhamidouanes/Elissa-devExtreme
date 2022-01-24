import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailPopUpService {

  apiUrl = environment.apiUrl;

  private details: any;
  detailssSubject : Subject<any>;


  constructor(private httpClient: HttpClient) { 
    this.detailssSubject = new Subject<any>();
  }

  emitDetails(): void{
    this.detailssSubject.next(this.details);
  }

  async getDetails(page: any, id: any): Promise<void>{
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
   } 
  }

}
