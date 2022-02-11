import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-test-case-run-details',
  templateUrl: './test-case-run-details.component.html',
  styleUrls: ['./test-case-run-details.component.scss']
})
export class TestCaseRunDetailsComponent{
 
  @Input() pjsData: any;


  constructor() {
  }

}
 




