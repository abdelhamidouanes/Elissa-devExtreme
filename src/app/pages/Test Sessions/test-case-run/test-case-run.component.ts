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
  value : any= new Date (this.currentDate.getFullYear() -1, this.currentDate.getMonth(), 1 ) ;
  date : any ;
  
  constructor(private testCaseRunService: TestCaseRunService) {
    this.testCaseRun = [];
    this.testCaseRunSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.testCaseRunSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    let month =parseInt(this.value.getMonth()) +1
    this.date = this.value.getFullYear() +"-"+month;
    await this.testCaseRunService.getTestCaseRun(this.date);
    this.testCaseRunSubscription = this.testCaseRunService.testCaseRunSubject.subscribe(data => {
      let counter = 0
      this.testCaseRun=[]
      for (let key in data) {
        if(data[key].ID_Session != null){
          this.testCaseRun[counter]=data[key];
          counter++;
        }
      }
    });
    this.testCaseRunService.emittestCaseRun();
  }

  async onValueChanged(e : any = new Date()) {
    let month =  parseInt(this.value.getMonth()) +1 
    this.date = this.value.getFullYear() +"-"+ month;
    await this.testCaseRunService.getTestCaseRun(this.date);
  } 
  
 
  
}
