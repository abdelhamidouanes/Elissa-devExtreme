import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-case-run-sous-details',
  templateUrl: './test-case-run-sous-details.component.html',
  styleUrls: ['./test-case-run-sous-details.component.scss']
})
export class TestCaseRunSousDetailsComponent implements OnInit {
  @Input() runsData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
