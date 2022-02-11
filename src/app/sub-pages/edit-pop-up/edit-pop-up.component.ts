import { formatDate, Time } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DetailPopUpService } from 'src/app/shared/services/detail-pop-up.service';
import { EventService } from 'src/app/shared/services/event.service';


@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss']
})
export class EditPopUpComponent implements OnInit, OnDestroy {

  @Input() event!: Observable<any>;
  @Input() title: any;

  eventSubscription : Subscription;
  eventData: any;

  currentDate:any=new Date();
  now:any=new Date();
  time:any;
  date:any;

  popupVisible = false;
  closeButtonOptions: any;
  planning:string[]=[ 'Fixed' ,'Regular'];
  status:string[]=['Open', 'Draft','Closed'];
  selectedItem:any;
  DateFormat:string="dd-MM-yyyy HH:mm";
  TimeFormat:string="HH:mm";
  public localID: string;


  constructor(private eventService: EventService, @Inject( LOCALE_ID ) localID: string) {
    this.eventSubscription = new Subscription();
    this.localID = localID;
    this.eventData = {Status: '', Planning: ''}
  }
  


  ngOnInit(): void {   
    this.eventSubscription = this.event.subscribe(data =>{
      this.eventData = data;
      this.popupVisible = true;
    });
  }


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


  closePopUp(): void{
    this.popupVisible = false;
  }

  
  async onSubmit(Selectstatus:any, Selectplanning:any, selectedDate:Date,selectedTime:Date){
    this.date = formatDate(selectedDate, this.DateFormat, this.localID);
    this.time = formatDate(selectedTime, this.TimeFormat, this.localID);

    if(Selectplanning=='Fixed'){
      await this.eventService.editEvent(this.eventData.ID, this.eventData.ID_Session, Selectstatus,Selectplanning,this.date);
    }
    else{
      await this.eventService.editEvent(this.eventData.ID, this.eventData.ID_Session, Selectstatus,Selectplanning,this.time);
    }
    this.closePopUp();
    
 }


}

