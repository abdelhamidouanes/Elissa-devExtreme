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

  currentDescription : any;
  seeDescriptionSubject: Subject<any> = new Subject<any>();

  popUpTitle = '';
  
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

  onSeeDescriptionClick(cell: any) {
    this.currentDescription = cell.data.Description;
    this.seeDescriptionSubject.next();
  }


  ngOnDestroy(): void {
    this.testCasesSubscription.unsubscribe();
  }

  onSeeDetailClick(cell: any): void {
    this.popUpTitle = 'Test Case Details'
    this.seeDetailSubject.next({'page': 'test-cases', 'id': cell.data.ID_Test});
  }

  onSeeDetailProductClick(cell: any){
    this.popUpTitle = 'Product Details'
    this.seeDetailSubject.next({'page': 'test-cases-product-detail', 'id': cell.data.ID_Product});
  }

  
  toUpperCase(value: any): string{
    if(value != null && typeof(value) == 'string' ){
      return value.toUpperCase();
    }else{
      return '';
    }
  }

  

}
