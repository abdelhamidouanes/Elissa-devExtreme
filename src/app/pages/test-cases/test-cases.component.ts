import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TestCaseService } from 'src/app/shared/services/test-case.service';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss']
})
export class TestCasesComponent implements OnInit {

  testCases:any[];
  testCasesSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();
  
  constructor(private testCaseService: TestCaseService) {

    this.testCases = [];
    this.testCasesSubscription = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    await this.testCaseService.getTestCases();
    this.testCasesSubscription = this.testCaseService.testCasesSubject.subscribe(data => {
      
      this.testCases = data.part;
    });

    this.testCaseService.emitTestCases();
  }

  ngOnDestroy(): void {
    this.testCasesSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'test-cases', 'id': cell.data.ID_Test});
  }

}
