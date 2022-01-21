import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsComponentsVersionsService {
 
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
    this.products = await this.httpClient.get<any>(this.apiUrl+'product/read_product_version.php?IdProd=0&Version=0&Liste=1').toPromise();
    this.emitProducts();
  }

  async getComponents(parentData: any): Promise<void>{
    const components = await this.httpClient.get<any>(this.apiUrl+'product/read_Component_version.php?IdProd='+parentData.ID_Product+'&Version='+parentData.Version+'&patch='+parentData.patch).toPromise();
    this.components.set(parentData.ID_Product+parentData.Version+parentData.patch, components);
    this.emitComponents();
  }

  initComponents(): void{
    this.components = new Map<string,any>();
    this.emitComponents();
  }
}
