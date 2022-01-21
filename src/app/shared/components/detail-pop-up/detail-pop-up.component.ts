import { Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DetailPopUpService } from '../../services/detail-pop-up.service';

@Component({
  selector: 'app-detail-pop-up',
  templateUrl: './detail-pop-up.component.html',
  styleUrls: ['./detail-pop-up.component.scss']
})
export class DetailPopUpComponent implements OnInit, OnDestroy {
  
  @Input() event!: Observable<any>;
  eventSubscription : Subscription;

  popupVisible = false;

  windowWidth : number; 

  details: any;
  detailsSubscription: Subscription;

  constructor(private detailPopUpService: DetailPopUpService) { 
    this.windowWidth = window.innerWidth;
    this.eventSubscription = new Subscription();
    this.detailsSubscription = new Subscription();
  }


  ngOnInit(): void {
    this.eventSubscription = this.event.subscribe(async data =>{
      await this.detailPopUpService.getDetails(data.page, data.id);
      this.popupVisible = true;
    });

    this.detailsSubscription = this.detailPopUpService.detailssSubject.subscribe(data => {
      this.details = data;
    });
    this.detailPopUpService.emitDetails();
  }
  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


  closePopUp(): void{
    this.popupVisible = false;
  }

  strRemplace(s : any): string{
    return s.replaceAll('_', ' ');
  }

  getWidthPopUp(): any{
    return this.windowWidth * 0.8;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWindow(event: any) {
     this.windowWidth = window.innerWidth;
  }

}
