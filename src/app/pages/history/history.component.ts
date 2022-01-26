import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HistoryService } from 'src/app/shared/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  
  typeHistory: any
  typeHistorySubscription: Subscription;

  history: any[];
  historySubscription: Subscription;

  constructor(private route: ActivatedRoute, private historyservice: HistoryService) {
    this.historySubscription = new Subscription();
    this.history = [];
    this.typeHistorySubscription  = new Subscription();
  }


  async ngOnInit(): Promise<void> {
    
    this.typeHistorySubscription = this.route.data.subscribe(v => {
      this.typeHistory = v.type
    });
      
    if (this.typeHistory == "Elissa") {
        await this.historyservice.getHistoryElissa();
    } else if (this.typeHistory == "Projector") {
        await this.historyservice.getHistoryProjector();
    }


    this.historySubscription = this.historyservice.historySubject.subscribe(data => {
      this.history = data.notifs;
    });
    this.historyservice.emithistory();

  }

  ngOnDestroy(): void {
    this.typeHistorySubscription.unsubscribe();
    this.historySubscription.unsubscribe();
  }


}
