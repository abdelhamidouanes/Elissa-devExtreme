import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TestSessionService } from 'src/app/shared/services/test-session.service';

@Component({
  selector: 'app-test-session',
  templateUrl: './test-session.component.html',
  styleUrls: ['./test-session.component.scss']
})
export class TestSessionComponent implements OnInit {
  
  testSessions: any[];
  testSessionsSubscription: Subscription;

  currentDate : any = new Date () ;
  value : any = new Date (this.currentDate.getFullYear() -1, this.currentDate.getMonth(), 1 ) ;
  date: any ;
  

  seeDetailSubject: Subject<any> = new Subject<any>();

  constructor(private testSessionsService: TestSessionService) {
    this.testSessions = [];
    this.testSessionsSubscription = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    let month = parseInt (this.value.getMonth()) +1
    this.date = this.value.getFullYear()+"-"+ month;
    console.log("date ", this.date )
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
    this.seeDetailSubject.next({'page': 'test-session', 'id': cell.data.ID_Session});
  }

  ngOnDestroy(): void {
    this.testSessionsSubscription.unsubscribe();
  }

  async onValueChanged(e : Date = new Date()) {
    
    let month =  parseInt(this.value.getMonth()) +1; 
    this.date = this.value.getFullYear() +"-"+ month;
    console.log(" date change ", this.date+"  "+ this.value)
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
