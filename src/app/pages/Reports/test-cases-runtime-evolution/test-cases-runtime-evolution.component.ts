import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsTestCasesRuntimeEvolutionService } from 'src/app/shared/services/reports-test-cases-runtime-evolution.service';

@Component({
  selector: 'app-test-cases-runtime-evolution',
  templateUrl: './test-cases-runtime-evolution.component.html',
  styleUrls: ['./test-cases-runtime-evolution.component.scss']
})
export class TestCasesRuntimeEvolutionComponent implements OnInit {


  data: any;
  dataSubscription : Subscription;
  

  constructor(private reportsTestCasesRuntimeEvolutionService: ReportsTestCasesRuntimeEvolutionService) { 
    this.dataSubscription = new Subscription();
    this.data = [];
  }

  async ngOnInit(): Promise<void> {
    await this.reportsTestCasesRuntimeEvolutionService.getData();
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
}
