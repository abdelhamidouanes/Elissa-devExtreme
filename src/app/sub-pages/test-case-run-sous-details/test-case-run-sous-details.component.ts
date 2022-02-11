import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-test-case-run-sous-details',
  templateUrl: './test-case-run-sous-details.component.html',
  styleUrls: ['./test-case-run-sous-details.component.scss']
})
export class TestCaseRunSousDetailsComponent implements OnInit {
  @Input() runsData: any;
  
  seeDetailSubject: Subject<any> = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSeeDetailClick(cell: any): void{
    this.seeDetailSubject.next({'page': 'test-case-run-sous-details', 'id': cell.data.ID_Run});
  }

}
