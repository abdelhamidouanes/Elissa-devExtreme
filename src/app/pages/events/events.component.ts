import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/shared/services/event.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any[];
  eventsSubscription: Subscription;
  isEditButtonVisible:boolean = true;
  isPlayButtonVisible:boolean = true;
  isDeleteButtonVisible:boolean = true;
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
  
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
