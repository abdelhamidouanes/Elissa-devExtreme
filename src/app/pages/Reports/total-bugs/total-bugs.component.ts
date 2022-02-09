import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsComponentsVersionsService } from 'src/app/shared/services/products-components-versions.service';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-total-bugs',
  templateUrl: './total-bugs.component.html',
  styleUrls: ['./total-bugs.component.scss']
})
export class TotalBugsComponent implements OnInit {
  selectBoxVersion:boolean=true
  idProduct=0
  versionProduct=0
  startDateInput: any = new Date(new Date().getFullYear(), 0, 1);
  endDateInput: any = new Date(new Date().getFullYear(), 11, 31)
  startDate: any = this.startDateInput.getFullYear() + "-" + this.startDateInput.getMonth();
  endDate: any = this.endDateInput.getFullYear() + "-" + this.endDateInput.getMonth();
  totalBugs: any[];
  totalBugsSubscription: Subscription;
  products: any[];
  productsSubscription: Subscription;
  versions: any[];
  versionsSubscription: Subscription;
  constructor(private reportsService: ReportsService, private productService: ProductsComponentsService, private VersionService: ProductsComponentsVersionsService) {
    this.totalBugsSubscription = new Subscription();
    this.totalBugs = [];
    this.productsSubscription = new Subscription();
    this.products = [];
    this.versionsSubscription = new Subscription();
    this.versions = [];
  }

  onPointClick(e: any) {
    e.target.select();
  }
  async ngOnInit(): Promise<void> {
    this.getTotalBugsService()
    this.getProductsService()
    this.getVersionService(0)
  }
  async onValueChanged(e: Date = new Date()) {
    this.startDate = this.startDateInput.getFullYear() + "-" + this.startDateInput.getMonth();
    this.endDate = this.endDateInput.getFullYear() + "-" + this.endDateInput.getMonth();
    this.getTotalBugsService()
    console.log(this.startDate);
  }
  onProductChanged(e: any) {
    console.log(e.value.ID_Product)
    this.idProduct=e.value.ID_Product
    if(this.idProduct==0){
      this.versionProduct=0
      this.versions=[]
      this.selectBoxVersion=true
    }else{
      this.selectBoxVersion=false
    }
    this.getVersionService(this.idProduct)
    this.getTotalBugsService()

  }
  onVersionChanged(e: any) {
    console.log(e.value)
    this.versionProduct=e.value
    this.getTotalBugsService()

  }
  async getTotalBugsService() {
    await this.reportsService.getTotalBugs(this.startDate, this.idProduct,this.versionProduct, this.endDate);
    this.totalBugsSubscription = this.reportsService.totalBugsSubject.subscribe(data => {
      this.totalBugs = data.test_run;
      console.log(data.test_run)
    });
    this.reportsService.emitTotalBugs();
  }
  async getProductsService() {
    await this.productService.getProducts();
    this.productsSubscription = this.productService.productsSubject.subscribe(data => {
      this.products.push({ ID_Product: 0, Name_Product: "All Products" })
      data.products.forEach((element: { ID_Product: any; Name_Product: any }) => {
        this.products.push({ ID_Product: element.ID_Product, Name_Product: element.Name_Product })
      });
    });
    this.productService.emitProducts();
  }
  async getVersionService(idProduct: any) {
    await this.VersionService.getVersions(idProduct);
    this.versionsSubscription = this.VersionService.versionsSubject.subscribe(data => {
      console.log(data)
      this.versions = data;
    });
    this.productService.emitProducts();
  }
  
  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName} years: ${arg.valueText}`,
    };
  }
}
