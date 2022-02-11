import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductsComponentsVersionsService } from 'src/app/shared/services/products-components-versions.service';

@Component({
  selector: 'app-products-components-versions-detail',
  templateUrl: './products-components-versions-detail.component.html',
  styleUrls: ['./products-components-versions-detail.component.scss']
})
export class ProductsComponentsVersionsDetailComponent implements OnInit {

  @Input() parentData: any;

  components : Map<string,any>;
  compoenntsSubscription: Subscription;
  
  seeDetailSubject: Subject<any> = new Subject<any>();


  constructor(private productsComponentsVersionsService: ProductsComponentsVersionsService) { 
    this.components = new Map<string,any>();
    this.compoenntsSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.compoenntsSubscription = this.productsComponentsVersionsService.componentsSubject.subscribe(data =>{
      this.components = data;
    });
    this.productsComponentsVersionsService.emitComponents();
    this.productsComponentsVersionsService.getComponents(this.parentData);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.compoenntsSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'products-components-versions-detail', 'id': cell.data.IdVersion});
  }

}
