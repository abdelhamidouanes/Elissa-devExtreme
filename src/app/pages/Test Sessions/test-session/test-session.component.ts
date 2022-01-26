import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestSessionService } from 'src/app/shared/services/test-session.service';

@Component({
  selector: 'app-test-session',
  templateUrl: './test-session.component.html',
  styleUrls: ['./test-session.component.scss']
})
export class TestSessionComponent implements OnInit {
  
  testSessions: any[];
  testSessionsSubscription: Subscription;

  constructor(private testSessionsService: TestSessionService) {
    this.testSessions = [];
    this.testSessionsSubscription = new Subscription();
   }

  async ngOnInit(): Promise<void> {
    await this.testSessionsService.getTestSessions();
    this.testSessionsSubscription = this.testSessionsService.testSessionsSubject.subscribe((data: any) => {
      let counter = 0;
      for (let key in data) {
        this.testSessions[counter]=data[key];
        counter++;
      }
    });
    this.testSessionsService.emitTestSessions();
  }


  onSeeDetailClick(cell: any): void{

  }

  ngOnDestroy(): void {
    this.testSessionsSubscription.unsubscribe();
  }

}
