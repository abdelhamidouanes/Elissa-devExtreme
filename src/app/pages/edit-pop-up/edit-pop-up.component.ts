import { formatDate, Time } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DetailPopUpService } from 'src/app/shared/services/detail-pop-up.service';
import { EventService } from 'src/app/shared/services/event.service';


@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss']
})
export class EditPopUpComponent implements OnInit {

  @Input() event!: Observable<any>;
  eventSubscription : Subscription;
  details: any;
  currentDate:Date=new Date();
  now:Date=new Date();
  time:any;
  date:any;
  detailsSubscription: Subscription;
  @Input() title: any;
  popupVisible = false;
  closeButtonOptions: any;
  planning:string[]=[ 'Fixed' ,'Regular'];
  status:string[]=['Open', 'Draft','Closed'];
  selectedItem:any;
  DateFormat:string="dd-MM-yyyy HH:mm";
  TimeFormat:string="HH:mm";
  public localID: string;
  test:any;

  constructor(private eventService: EventService,private detailPopUpService :DetailPopUpService,@Inject( LOCALE_ID ) localID: string) {
    this.eventSubscription = new Subscription();
    this.detailsSubscription = new Subscription();
    this.localID = localID;
  }

  ngOnInit(): void {   
    this.eventSubscription = this.event.subscribe(async data =>{
      await this.detailPopUpService.getDetails(data.page, data.id);
      this.popupVisible = true;
    });

    this.detailsSubscription = this.detailPopUpService.detailssSubject.subscribe(data => {
      this.details = data;
      console.log(this.details);
    });
    this.detailPopUpService.emitDetails();
  }

  closePopUp(): void{
    this.popupVisible = false;
  }

  
  onSubmit(Selectstatus:any,Seelectplanning:any,selectedDate:Date,selectedTime:Date){
    console.log(Selectstatus);
    console.log(Seelectplanning);
    this.date=formatDate(selectedDate,this.DateFormat,this.localID);
    console.log(this.date);
    this.time=formatDate(selectedTime,this.TimeFormat,this.localID);
    console.log("this is time : "+this.time);
    console.log("this.details.ID : "+this.details.ID);
    if(Seelectplanning=='Fixed'){
     this.eventService.editEvent(this.details.ID, this.details.ID_Session, Selectstatus,Seelectplanning,this.date).subscribe(res=>{
       console.log(res)
     },
     err=>{console.log(err)});
    }
     else{
       this.eventService.editEvent(this.details.ID, this.details.ID_Session, Selectstatus,Seelectplanning,this.time).subscribe(res=>{
         console.log(res)
       },
       err=>{console.log(err)});
     }
    
 }
}

