import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventService } from 'src/app/shared/services/event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any[];
  eventsSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();
  updateEvent: Subject<any> = new Subject<any>();
  popUpTitle = '';


  constructor(private eventService: EventService) {
    this.events = [];
    this.eventsSubscription = new Subscription();
  }

  async ngOnInit(): Promise<void> {

    await this.eventService.getEvents();  
    this.eventsSubscription = this.eventService.eventsSubject.subscribe(data => {
      this.events = data.events;
    });
    this.eventService.emitEvents();
    
  }


  onSeeDetailClick(cell: any): void {
    this.popUpTitle = 'Event Details';
    this.seeDetailSubject.next({'page': 'events', 'id': cell.data.ID});
  }

  
  onSeeDetailProductClick(cell: any): void {
    this.popUpTitle = 'Product Details';
    this.seeDetailSubject.next({'page': 'events-product-detail', 'id': cell.data.ID_Product});
  }

  onSeeDetailSessionClick(cell:any):void{
    this.popUpTitle = 'Session Details';
    this.seeDetailSubject.next({'page': 'events-session-detail', 'id': cell.data.ID_Session});
  }
  editPopup(cell:any):void{
    this.popUpTitle='Update event';
    this.updateEvent.next({'id':cell.data.ID});
    
  }
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
 
}
