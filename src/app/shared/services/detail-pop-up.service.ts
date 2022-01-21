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
      case '': { 
         //statements; 
         break; 
      }
   } 
  }

}
