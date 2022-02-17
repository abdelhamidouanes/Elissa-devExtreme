import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '.';
import { AlertMsgService } from './alert-msg.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsTestCasesRuntimeEvolutionService {

  private data: any;
  dataSubject : Subject<any>;

  private products: any;
  productsSubject: Subject<any>;

  private versions: any;
  versionsSubject: Subject<any>;

  private tests: any;
  testsSubject: Subject<any>;
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private alertMsgService: AlertMsgService) { 
    this.data = [];
    this.dataSubject = new Subject<any>();
    this.products = [];
    this.productsSubject = new Subject<any>();
    this.versions = [];
    this.versionsSubject = new Subject<any>();
    this.tests = [];
    this.testsSubject = new Subject<any>();
  }

  emitData(): void{
    this.dataSubject.next(this.data);
  }

  emitProducts(): void{
    this.productsSubject.next(this.products);
  }

  emitVersions(): void{
    this.versionsSubject.next(this.versions);
  }

  emitTests(): void{
    this.testsSubject.next(this.tests);
  }

  async getData(idTest: any, idProd: any, idVersion: any): Promise<void> {
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        let httpBody = new FormData();
        httpBody.append('Id_Test', idTest);
        httpBody.append('ID_prod', idProd);
        httpBody.append('Id_version', idVersion);
        this.data = await this.httpClient.post<any>(this.apiUrl + 'charts/charts_RuntimeTestCase.php', httpBody).toPromise();
        this.emitData();
      }      
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }


  async getProducts(): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.products = await this.httpClient.get<any>(this.apiUrl+'product/read.php?IdProd=0&IdVersion=0').toPromise();
        this.emitProducts();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getVersions(idProduct:any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.versions = await this.httpClient.get<any>(this.apiUrl+'version/read_VersionOnly.php?IdProd=' +idProduct+'&index=false').toPromise();
        this.emitVersions();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }

  async getTests(idProduct:any, idVersion:any): Promise<void>{
    this.loadingService.afficherDisplayLoading();
    try {
      if(await this.authService.verifyApiKey()){
        this.tests = await this.httpClient.get<any>(this.apiUrl+'test/read.php?IdProd='+idProduct+'&Version='+idVersion+'&index=all&Status=1').toPromise();
        this.emitTests();
      }
    } catch (error) {
      this.alertMsgService.setTitle('Connection error.');
      this.alertMsgService.setMsg('An error occurred while loading data.');
      this.alertMsgService.afficherDisplayAlertMsg();
    }
    this.loadingService.cacherDisplayLoading();
  }


}
