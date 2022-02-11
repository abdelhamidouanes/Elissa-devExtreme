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

  currentDate : any = new Date () ;

  dateBoxValue : any= new Date (this.currentDate.getFullYear() -1, this.currentDate.getMonth(), 1 ) ;
  dateApi : any ;
  
  
  constructor(private testCaseRunService: TestCaseRunService) {
    this.testCaseRun = [];
    this.testCaseRunSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.testCaseRunSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    let month =parseInt(this.dateBoxValue.getMonth()) +1
    this.dateApi = this.dateBoxValue.getFullYear() +"-"+month;
    await this.testCaseRunService.getTestCaseRun(this.dateApi);

    this.testCaseRunSubscription = this.testCaseRunService.testCaseRunSubject.subscribe(data => {
      if(data.numberrows == 0){
        this.testCaseRun = [];
      }else{
        this.testCaseRun = Object.values(data);
      }
    });
    this.testCaseRunService.emittestCaseRun();
  }

  async onValueChanged(e : any = new Date()) {
    let month =  parseInt(this.dateBoxValue.getMonth()) +1 
    this.dateApi = this.dateBoxValue.getFullYear() +"-"+ month;

    await this.testCaseRunService.getTestCaseRun(this.dateApi);
  } 
  
}
