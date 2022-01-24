import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {  TestCaseRunService } from 'src/app/shared/services/test-case-run.service';

@Component({
  selector: 'app-test-case-run',
  templateUrl: './test-case-run.component.html',
  styleUrls: ['./test-case-run.component.scss']
})
export class TestCaseRunComponent implements OnInit , OnDestroy{
 

  testCaseRun: any[];
  testCaseRunSubscription: Subscription; 


  

  constructor(private testCaseRunService: TestCaseRunService) {
    this.testCaseRun = [];
    this.testCaseRunSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async ngOnInit(): Promise<void> {
   await this.testCaseRunService.getTestCaseRun();
    this.testCaseRunSubscription = this.testCaseRunService.testCaseRunSubject.subscribe(data => {
      let counter = 0;
      for (let key in data) {
        if(data[key].ID_Session != null){
          this.testCaseRun[counter]=data[key];
          counter++;
        }
      }
    });
    this.testCaseRunService.emittestCaseRun();
  }

}
