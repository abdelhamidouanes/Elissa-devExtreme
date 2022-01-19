import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-test-case-runs-analysis',
  templateUrl: './test-case-runs-analysis.component.html',
  styleUrls: ['./test-case-runs-analysis.component.scss']
})
export class TestCaseRunsAnalysisComponent implements OnInit,OnDestroy {

  customers: any[];
  customersSubscription: Subscription;

  constructor(private customerService: CustomerService) {
    this.customers = [];
    this.customersSubscription = new Subscription();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

 
  async ngOnInit(): Promise<void> {
    await this.customerService.getAllCustomers();
    this.customersSubscription = this.customerService.customersSubject.subscribe(data => {
      console.log(data)
      this.customers = data.issues;
    });
    this.customerService.emitCustomers();
  }

}
