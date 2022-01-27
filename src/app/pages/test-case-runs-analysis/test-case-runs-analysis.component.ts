import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TestCaseRunsAnalysisService } from 'src/app/shared/services/test-case-runs-analysis.service';

@Component({
  selector: 'app-test-case-runs-analysis',
  templateUrl: './test-case-runs-analysis.component.html',
  styleUrls: ['./test-case-runs-analysis.component.scss']
})
export class TestCaseRunsAnalysisComponent implements OnInit,OnDestroy {

  testCaseRunsAnalysis: any[];
  testCaseRunsAnalysisSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();

  constructor(private testCaseRunsAnalysisService: TestCaseRunsAnalysisService) {
    this.testCaseRunsAnalysis = [];
    this.testCaseRunsAnalysisSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.testCaseRunsAnalysisSubscription.unsubscribe();
  }

 
  async ngOnInit(): Promise<void> {
    await this.testCaseRunsAnalysisService.getTestCaseRunsAnalysis();
    this.testCaseRunsAnalysisSubscription = this.testCaseRunsAnalysisService.testCaseRunsAnalysisSubject.subscribe(data => {
      this.testCaseRunsAnalysis = data.issues;
    });
    this.testCaseRunsAnalysisService.emitTestCaseRunsAnalysis();
  }

  
  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'test-case-runs-analysis', 'id': cell.data.ID_Issue});
  }

}
