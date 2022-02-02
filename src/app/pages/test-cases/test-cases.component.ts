import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TestCaseServiceService } from 'src/app/shared/services/test-case-service.service';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.scss']
})
export class TestCasesComponent implements OnInit {

  testCases:any[];
  testCasesSubscription: Subscription;

  currentDescription : any;
  seeDescriptionSubject: Subject<any> = new Subject<any>();
  
  constructor(private testCaseService: TestCaseServiceService) {

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

  onSeeDescriptionClick(cell: any) {
    this.currentDescription = cell.data.Description;
    this.seeDescriptionSubject.next();
  }


  ngOnDestroy(): void {
    this.testCasesSubscription.unsubscribe();
  }

 

}
