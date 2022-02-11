import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';

@Component({
  selector: 'app-products-components',
  templateUrl: './products-components.component.html',
  styleUrls: ['./products-components.component.scss']
})
export class ProductsComponentsComponent implements OnInit, OnDestroy {

  products: any[];
  productsSubscription: Subscription; 

  closeButtonOptions: any;

  seeDetailSubject: Subject<any> = new Subject<any>();


  constructor(private productsComponentsService: ProductsComponentsService) { 
    this.products = [];
    this.productsSubscription = new Subscription();
  }


  async ngOnInit(): Promise<void> {
    await this.productsComponentsService.getProducts();
    this.productsSubscription = this.productsComponentsService.productsSubject.subscribe(data => {
      this.products = data.products;
    });
    this.productsComponentsService.emitProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'products-components', 'id': cell.data.ID_Product});
  }

}
