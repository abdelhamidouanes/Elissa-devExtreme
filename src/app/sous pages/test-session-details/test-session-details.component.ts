import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-session-details',
  templateUrl: './test-session-details.component.html',
  styleUrls: ['./test-session-details.component.scss']
})
export class TestSessionDetailsComponent implements OnInit {
  @Input() testListData : any ;
  constructor() { 
    
  }

  ngOnInit(): void {
    console.log (this.testListData);
   
  }



}
