import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductsComponentsVersionsService } from 'src/app/shared/services/products-components-versions.service';

@Component({
  selector: 'app-products-components-versions',
  templateUrl: './products-components-versions.component.html',
  styleUrls: ['./products-components-versions.component.scss']
})
export class ProductsComponentsVersionsComponent implements OnInit {

  products: any[];
  productsSubscription: Subscription;

  closeButtonOptions: any;

  seeDetailSubject: Subject<any> = new Subject<any>();


  constructor(private productsComponentsVersionsService: ProductsComponentsVersionsService) { 
    this.products = [];
    this.productsSubscription = new Subscription();
  }


  async ngOnInit(): Promise<void> {
    await this.productsComponentsVersionsService.getProducts();
    this.productsSubscription = this.productsComponentsVersionsService.productsSubject.subscribe(data => {
      this.products = data.products;
    });
    this.productsComponentsVersionsService.emitProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'products-components-versions', 'id': cell.data.ID_Version});
  }
}
