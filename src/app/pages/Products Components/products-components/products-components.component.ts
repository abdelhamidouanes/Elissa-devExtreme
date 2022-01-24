import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';

@Component({
  selector: 'app-products-components',
  templateUrl: './products-components.component.html',
  styleUrls: ['./products-components.component.scss']
})
export class ProductsComponentsComponent implements OnInit, OnDestroy {

  products: any[];
  productsSubscription: Subscription; 

  popupVisible = false;

  closeButtonOptions: any;

  constructor(private productsComponentsService: ProductsComponentsService) { 
    this.products = [];
    this.productsSubscription = new Subscription();

    this.closeButtonOptions = {
      text: 'Close',
      onClick(e: any) {
        this.popupVisible = false;
      },
    };
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

}
