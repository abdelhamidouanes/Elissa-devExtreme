import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss']
})
export class EditPopUpComponent implements OnInit {

  @Input() event!: Observable<any>;
  eventSubscription : Subscription | undefined;

  @Input() title: any;
  popupVisible = false;
  closeButtonOptions: any;
   status:any;
  constructor(private eventService: EventService) {
    this.eventSubscription = new Subscription();
   }

  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(async data =>{
      await this.eventService.getEvent(data.id);
      this.popupVisible = true;
      this.status=[ { Name: 'Open', ID: 0 },
      { Name: 'Draft', ID: 1 },
      { Name: 'Closed', ID: 2 }]
    });
  }
  closePopUp(): void{
    this.popupVisible = false;
  }

}
