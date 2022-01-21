import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';

@Component({
  selector: 'app-products-components-detail',
  templateUrl: './products-components-detail.component.html',
  styleUrls: ['./products-components-detail.component.scss']
})
export class ProductsComponentsDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Input() idProd: any;

  components : Map<string,any>;
  compoenntsSubscription: Subscription;
  
  seeDetailSubject: Subject<any> = new Subject<any>();

  constructor(private productsComponentsService: ProductsComponentsService) { 
    this.components = new Map<string,any>();
    this.compoenntsSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.compoenntsSubscription = this.productsComponentsService.componentsSubject.subscribe(data =>{
      this.components = data;
    });
    this.productsComponentsService.emitComponents();

    this.productsComponentsService.getComponents(this.idProd);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.compoenntsSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'products-components-detail', 'id': cell.data.ID_Product});
  }


}
