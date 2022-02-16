import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsComponentsVersionsService } from 'src/app/shared/services/products-components-versions.service';
import { ProductsComponentsService } from 'src/app/shared/services/products-components.service';
import { ReportTotalTestCasesRunService } from 'src/app/shared/services/report-total-test-cases-run.service';

@Component({
  selector: 'app-total-test-cases-run',
  templateUrl: './total-test-cases-run.component.html',
  styleUrls: ['./total-test-cases-run.component.scss']
})
export class TotalTestCasesRunComponent implements OnInit, OnDestroy {

  isVisibleToast = false;
  typeToast = 'warning';
  messageToast = 'Start Date must be less than End Date';

  selectBoxSession: boolean = true
  selectBoxVersion: boolean = true
  idProduct = 0
  idSession = 0
  versionProduct = 0

  startDateInput: any = new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1);
  endDateInput: any = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  startDate: any = this.startDateInput.getFullYear() + "-" + (Number.parseInt(this.startDateInput.getMonth() + 1) < 10 ? '0' + Number.parseInt(this.startDateInput.getMonth() + 1) : Number.parseInt(this.startDateInput.getMonth() + 1));
  endDate: any = this.endDateInput.getFullYear() + "-" + (Number.parseInt(this.endDateInput.getMonth() + 2) < 10 ? '0' + Number.parseInt(this.endDateInput.getMonth() + 2) : Number.parseInt(this.endDateInput.getMonth() + 2));

  TestRunStats: any[];
  TestRunStatsSubscription: Subscription;
  products: any[];
  productsSubscription: Subscription;
  versions: any[];
  versionsSubscription: Subscription;

  sessions: any[];
  sessionsSubscription: Subscription;

  constructor(private reportTotalTestCasesRunService: ReportTotalTestCasesRunService, private productService: ProductsComponentsService, private VersionService: ProductsComponentsVersionsService) {
    this.TestRunStatsSubscription = new Subscription();
    this.TestRunStats = [];
    this.productsSubscription = new Subscription();
    this.products = [];
    this.versionsSubscription = new Subscription();
    this.versions = [];
    this.sessionsSubscription = new Subscription();
    this.sessions = [];
  }


  onPointClick(e: any) {
    e.target.select();
  }


  async ngOnInit(): Promise<void> {
    await this.getTestRunStatsService();
    await this.getProductsService();
    await this.getVersionService(0);
    await this.getSessionService(0, 0, 'list')
  }


  ngOnDestroy(): void {
    this.TestRunStatsSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.versionsSubscription.unsubscribe();
  }

  async onValueChanged(e: Date = new Date()) {
    this.startDate = this.startDateInput.getFullYear() + "-" + (Number.parseInt(this.startDateInput.getMonth() + 1) < 10 ? '0' + Number.parseInt(this.startDateInput.getMonth() + 1) : Number.parseInt(this.startDateInput.getMonth() + 1));
    this.endDate = this.endDateInput.getFullYear() + "-" + (Number.parseInt(this.endDateInput.getMonth() + 2) < 10 ? '0' + Number.parseInt(this.endDateInput.getMonth() + 2) : Number.parseInt(this.endDateInput.getMonth() + 2));
    if (this.startDate > this.endDate) {
      this.isVisibleToast = true
    } else {
      this.isVisibleToast = false
      await this.reportTotalTestCasesRunService.getTestRunStats(this.startDate, this.idProduct, this.versionProduct, 0, this.endDate);
    }
  }


  async onProductChanged(e: any) {
    this.idProduct = e.value.ID_Product
    if (this.idProduct == 0) {
      this.versionProduct = 0
      this.versions = []
      this.sessions = []
      this.selectBoxVersion = true
      this.selectBoxSession = true
    } else {
      this.selectBoxVersion = false
    }
    await this.VersionService.getVersions(this.idProduct);
    await this.reportTotalTestCasesRunService.getTestRunStats(this.startDate, this.idProduct, this.versionProduct, 0, this.endDate);
  }

  async onVersionChanged(e: any) {
    this.versionProduct = e.value;
    if (this.versionProduct == 0) {
      this.sessions = []
      this.selectBoxSession = true
    } else {
      this.selectBoxSession = false
    }
    await this.reportTotalTestCasesRunService.getTestSession(this.idProduct, this.versionProduct, "liste");
    await this.reportTotalTestCasesRunService.getTestRunStats(this.startDate, this.idProduct, this.versionProduct, this.idSession, this.endDate);

  }

  async onSessionChanged(e: any) {
    this.idSession = e.value
    await this.reportTotalTestCasesRunService.getTestRunStats(this.startDate, this.idProduct, this.versionProduct, this.idSession, this.endDate);
  }

  async getTestRunStatsService() {
    await this.reportTotalTestCasesRunService.getTestRunStats(this.startDate, this.idProduct, this.versionProduct, 0, this.endDate);
    this.TestRunStatsSubscription = this.reportTotalTestCasesRunService.testRunStatsSubject.subscribe(data => {
      this.TestRunStats = [];
      data.test_run.forEach((element: any, index: any) => {
        for (let key in element) {
          if (key != 'years') {
            element[key] = Number.parseInt(element[key]);
          }
        }
        this.TestRunStats[index] = element;
      });
    });
    this.reportTotalTestCasesRunService.emitTestRunStatsSubject();
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

      this.versions.push({ Version: "All version", Value: 0 })
      data.forEach((element: { Version: any; }) => {
        this.versions.push({ Version: element.Version, Value: element.Version })
      });
    });
    this.productService.emitProducts();
  }

  async getSessionService(idProduct: any, versionProduct: any, from: any) {
    await this.reportTotalTestCasesRunService.getTestSession(idProduct, versionProduct, from);
    this.sessionsSubscription = this.reportTotalTestCasesRunService.testSessionsSubject.subscribe(data => {
      this.sessions = [];
      this.sessions.push({ Name_Session: "All Test Sessions", ID_Session: 0 })
      data.forEach((element: { Name_Session: any; ID_Session: any; }) => {
        this.sessions.push({ Name_Session: element.Name_Session, ID_Session: element.ID_Session })
      });
    });
    this.reportTotalTestCasesRunService.emitTestSessionsSubject();
  }
  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName} : ${arg.valueText}`,
    };
  }


}

