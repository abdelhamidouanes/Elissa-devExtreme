import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsTestCasesRuntimeEvolutionService } from 'src/app/shared/services/reports-test-cases-runtime-evolution.service';

@Component({
  selector: 'app-test-cases-runtime-evolution',
  templateUrl: './test-cases-runtime-evolution.component.html',
  styleUrls: ['./test-cases-runtime-evolution.component.scss']
})
export class TestCasesRuntimeEvolutionComponent implements OnInit, OnDestroy {


  data: any;
  dataSubscription : Subscription;
  
  products: any[];
  productsSubscription: Subscription;

  versions: any[];
  versionsSubscription: Subscription;

  tests: any[];
  testsSubscription: Subscription;

  idProduct=0;
  idVersion=0;
  idTest = 0;

  selectBoxVersion : boolean = true
  selectBoxTest: boolean = true;

  constructor(private reportsTestCasesRuntimeEvolutionService: ReportsTestCasesRuntimeEvolutionService) { 
    this.dataSubscription = new Subscription();
    this.data = [];
    this.productsSubscription = new Subscription();
    this.products = [];
    this.versionsSubscription = new Subscription();
    this.versions = [];
    this.testsSubscription = new Subscription();
    this.tests = [];
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.versionsSubscription.unsubscribe();
    this.testsSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    await this.getVersions('0');
    await this.getTests('0', '0');
    await this.getData();
  }

  
  async getProducts() {
    await this.reportsTestCasesRuntimeEvolutionService.getProducts();
    this.productsSubscription = this.reportsTestCasesRuntimeEvolutionService.productsSubject.subscribe(data => {
      this.products = data.products;
      this.products.unshift({ ID_Product: 0, Name_Product: "All Products" });
    });
    this.reportsTestCasesRuntimeEvolutionService.emitProducts();
  }


  async getVersions(idProduct: any) {
    await this.reportsTestCasesRuntimeEvolutionService.getVersions(idProduct);
    this.versionsSubscription = this.reportsTestCasesRuntimeEvolutionService.versionsSubject.subscribe(data => {
      this.versions = [];
      if(data){
        this.versions = data;
      }
      this.versions.unshift({Version: 0});
      this.versions.forEach((element, index)=>{
        this.versions[index] = {...element,...{VersionName: element.Version==0?'All Version':element.Version}}
      });
    });
    this.reportsTestCasesRuntimeEvolutionService.emitVersions();
  }

  async getTests(idProduct: any, idVersion: any){
    await this.reportsTestCasesRuntimeEvolutionService.getTests(idProduct, idVersion);
    this.testsSubscription = this.reportsTestCasesRuntimeEvolutionService.testsSubject.subscribe(data => {
      this.tests = []
      if(data.part){
        this.tests = data.part;
      }
      this.tests.unshift({ID_Test: 0, Test_Name: 'All Tests'});
    });
    this.reportsTestCasesRuntimeEvolutionService.emitTests();
  }
  

  async getData(){
    await this.reportsTestCasesRuntimeEvolutionService.getData(this.idTest, this.idProduct, this.idVersion);
    this.dataSubscription = this.reportsTestCasesRuntimeEvolutionService.dataSubject.subscribe(data => {
      this.data = [];
      data.test_run.forEach((element: any, index: any) => {
        for (let key in element) {
          if(key != 'dates'){
            element[key] =  Number.parseInt(element[key]);
          }
        }
        this.data[index] = element;
      });
    });
    this.reportsTestCasesRuntimeEvolutionService.emitData();
  }

  async onProductChanged(e: any) {
    this.idProduct = e.value;
    this.idVersion = 0;
    this.idTest = 0;
    if(this.idProduct == 0){
      this.selectBoxVersion = true;
      this.selectBoxTest = true;
    }else{
      this.selectBoxVersion = false;
    }
    await this.reportsTestCasesRuntimeEvolutionService.getVersions(this.idProduct);
    await this.reportsTestCasesRuntimeEvolutionService.getData(this.idTest, this.idProduct, this.idVersion);
  }

  async onVersionChanged(e: any) {
    this.idVersion = e.value;
    this.idTest = 0;
    if(this.idVersion == 0){
      this.selectBoxTest = true;
    }else{
      this.selectBoxTest = false;
    }
    await this.reportsTestCasesRuntimeEvolutionService.getTests(this.idProduct, this.idVersion);
    await this.reportsTestCasesRuntimeEvolutionService.getData(this.idTest, this.idProduct, this.idVersion);
  }

  async onTestChanged(e: any) {
    this.idTest = e.value;
    await this.reportsTestCasesRuntimeEvolutionService.getData(this.idTest, this.idProduct, this.idVersion);
  }

}
