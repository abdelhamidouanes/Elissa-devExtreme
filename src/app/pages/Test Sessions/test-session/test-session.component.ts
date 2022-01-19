import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { TestSessionService } from 'src/app/shared/services/test-session.service';

@Component({
  selector: 'app-test-session',
  templateUrl: './test-session.component.html',
  styleUrls: ['./test-session.component.scss']
})
export class TestSessionComponent implements OnInit {
  
  testSessions: any[];
  testSessionsSubscription: Subscription;

  popupVisible = false;

  closeButtonOptions: any;


  constructor(private testSessionsService: TestSessionService) {
    this.testSessions = [];
    this.testSessionsSubscription = new Subscription();

    this.closeButtonOptions = {
      text: 'Close',
      onClick(e: any) {
        this.popupVisible = false;
      },
    };
   }

   async ngOnInit(): Promise<void> {
    await this.testSessionsService.getTestSessions();
    this.testSessionsSubscription = this.testSessionsService.productsSubject.subscribe((data: any) => {
      let counter = 0;
      for (let key in data) {
        this.testSessions[counter]=data[key];
        counter++;
      }
    });
    this.testSessionsService.emitTestSessions();
  }

  ngOnDestroy(): void {
    this.testSessionsSubscription.unsubscribe();
  }

}
