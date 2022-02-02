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
  date: any = new Date (2021,1,1) 
  value : any= new Date (2021,1,1) 

  constructor(private testSessionsService: TestSessionService) {
    this.testSessions = [];
    this.testSessionsSubscription = new Subscription();
   }

  async ngOnInit(): Promise<void> {
    await this.testSessionsService.getTestSessions(this.date);
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

  async onValueChanged(e : Date = new Date()) {
    
    this.date = this.value.getFullYear() +"-"+this.value.getMonth();
    console.log(this.date);
    await this.testSessionsService.getTestSessions(this.date);
    this.testSessionsSubscription = this.testSessionsService.testSessionsSubject.subscribe(data => {
      let counter = 0;
      for (let key in data) {
        if(data[key].ID_Session != null){
          this.testSessions[counter]=data[key];
          counter++;
        }
      }
    });
  }

}
