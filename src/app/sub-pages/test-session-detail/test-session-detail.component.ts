import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-session-detail',
  templateUrl: './test-session-detail.component.html',
  styleUrls: ['./test-session-detail.component.scss']
})
export class TestSessionDetailComponent implements OnInit {

  @Input() data : any ;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
