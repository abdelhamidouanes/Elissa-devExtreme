import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsComponentsService {

  apiUrl = environment.apiUrl;

  private products: any;
  productsSubject : Subject<any>;

  private components: Map<string,any>;
  componentsSubject : Subject<Map<string,any>>;

  constructor(private httpClient: HttpClient) {
    this.products = [];
    this.productsSubject = new Subject<any>();

    this.components = new Map<string,any>();
    this.componentsSubject = new Subject<Map<string,any>>();
  }

  emitProducts(): void{
    this.productsSubject.next(this.products);
  }

  emitComponents(): void{
    this.componentsSubject.next(this.components);
  }

  async getProducts(): Promise<void>{
    this.products = await this.httpClient.get<any>(this.apiUrl+'product/read.php?IdProd=0&IdVersion=0').toPromise();
    this.emitProducts();
  }

  async getComponents(idProd: any): Promise<void>{
    const components = await this.httpClient.get<any>(this.apiUrl+'product/read.php?IdProd='+idProd+'&IdVersion=0').toPromise();
    this.components.set(idProd,components);
    this.emitComponents();
  }

  initComponents(): void{
    this.components = new Map<string,any>();
    this.emitComponents();
  }

}
