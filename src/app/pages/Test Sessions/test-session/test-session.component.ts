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

  dateBoxValue : any = new Date (this.currentDate.getFullYear() -1, this.currentDate.getMonth(), 1 ) ;
  dateApi: any ;
  

  seeDetailSubject: Subject<any> = new Subject<any>();

  constructor(private testSessionsService: TestSessionService) {
    this.testSessions = [];
    this.testSessionsSubscription = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    let month = parseInt (this.dateBoxValue.getMonth()) +1
    this.dateApi = this.dateBoxValue.getFullYear()+"-"+ month;

    await this.testSessionsService.getTestSessions(this.dateApi);
    this.testSessionsSubscription = this.testSessionsService.testSessionsSubject.subscribe((data: any) => {
      if(data.Status != null){
        this.testSessions = [];
      }else{
        this.testSessions = Object.values(data);
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
    
    let month =  parseInt(this.dateBoxValue.getMonth()) +1; 
    this.dateApi = this.dateBoxValue.getFullYear() +"-"+ month;
    
    await this.testSessionsService.getTestSessions(this.dateApi);

  }

}
