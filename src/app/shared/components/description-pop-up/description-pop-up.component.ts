import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-description-pop-up',
  templateUrl: './description-pop-up.component.html',
  styleUrls: ['./description-pop-up.component.scss']
})
export class DescriptionPopUpComponent implements OnInit {
  
  @Input() event!: Observable<any>;
  eventSubscription : Subscription;

  @Input() title: any;

  @Input() descriptionhtml: any

  popupVisible = false;


  
  windowWidth : number; 
  windowHeight : number;


  constructor() { 
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.eventSubscription = new Subscription();
  }


  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(async data =>{
      this.popupVisible = true;
    });
  }
  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


  closePopUp(): void{
    this.popupVisible = false;
  }


  
  getWidthPopUp(): any{
    return this.windowWidth * 0.8;
  }

  getHeightPopUp(): any{
    return this.windowHeight * 0.8;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWindow(event: any) {
     this.windowWidth = window.innerWidth;
     this.windowHeight = window.innerHeight;
  }

}
