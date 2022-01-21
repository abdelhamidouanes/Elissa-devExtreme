import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-test-case-runs-analysis',
  templateUrl: './test-case-runs-analysis.component.html',
  styleUrls: ['./test-case-runs-analysis.component.scss']
})
export class TestCaseRunsAnalysisComponent implements OnInit,OnDestroy {

  customers: any[];
  customersSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();

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
      this.customers = data.issues;
    });
    this.customerService.emitCustomers();
  }

  
  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'test-case-runs-analysis', 'id': cell.data.ID_Issue});
  }

}
