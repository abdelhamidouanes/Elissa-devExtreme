import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsComponentsVersionsService } from 'src/app/shared/services/products-components-versions.service';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-total-bugs',
  templateUrl: './total-bugs.component.html',
  styleUrls: ['./total-bugs.component.scss']
})
export class TotalBugsComponent implements OnInit, OnDestroy {

  
  selectBoxVersion:boolean=true
  idProduct=0
  versionProduct=0

  startDateInput: any = new Date(new Date().getFullYear() -1, new Date().getMonth(), 1);
  endDateInput: any = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  startDate: any = this.startDateInput.getFullYear() + "-" + (Number.parseInt(this.startDateInput.getMonth()+1)<10?'0'+Number.parseInt(this.startDateInput.getMonth()+1):Number.parseInt(this.startDateInput.getMonth()+1));
  endDate: any = this.endDateInput.getFullYear() + "-" + (Number.parseInt(this.endDateInput.getMonth()+2)<10?'0'+Number.parseInt(this.endDateInput.getMonth()+2):Number.parseInt(this.endDateInput.getMonth()+2));

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
    await this.getTotalBugsService();
    await this.getProductsService();
    await this.getVersionService(0);
  }


  ngOnDestroy(): void {
    this.totalBugsSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.versionsSubscription.unsubscribe();
  }

  async onValueChanged(e: Date = new Date()) {
    this.startDate = this.startDateInput.getFullYear() + "-" + (Number.parseInt(this.startDateInput.getMonth()+1)<10?'0'+Number.parseInt(this.startDateInput.getMonth()+1):Number.parseInt(this.startDateInput.getMonth()+1));
    this.endDate = this.endDateInput.getFullYear() + "-" + (Number.parseInt(this.endDateInput.getMonth()+2)<10?'0'+Number.parseInt(this.endDateInput.getMonth()+2):Number.parseInt(this.endDateInput.getMonth()+2));  
    await this.reportsService.getTotalBugs(this.startDate, this.idProduct,this.versionProduct, this.endDate);
  }


  async onProductChanged(e: any) {
    this.idProduct = e.value.ID_Product
    if(this.idProduct==0){
      this.versionProduct=0
      this.versions=[]
      this.selectBoxVersion=true
    }else{
      this.selectBoxVersion=false
    }
    await this.VersionService.getVersions(this.idProduct);
    await this.reportsService.getTotalBugs(this.startDate, this.idProduct,this.versionProduct, this.endDate);
  }


  async onVersionChanged(e: any) {

    this.versionProduct=e.value;
    await this.reportsService.getTotalBugs(this.startDate, this.idProduct,this.versionProduct, this.endDate);

  }


  async getTotalBugsService() {
    await this.reportsService.getTotalBugs(this.startDate, this.idProduct,this.versionProduct, this.endDate);
    this.totalBugsSubscription = this.reportsService.totalBugsSubject.subscribe(data => {
      this.totalBugs = [];
      data.test_run.forEach((element: any, index: any) => {
        for (let key in element) {
          if(key != 'years'){
            element[key] =  Number.parseInt(element[key]);
          }
        }
        this.totalBugs[index] = element;
      });
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
      this.versions = data;
    });
    this.VersionService.emitVersions();
  }
  
  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName} : ${arg.valueText}`,
    };
  }


}
