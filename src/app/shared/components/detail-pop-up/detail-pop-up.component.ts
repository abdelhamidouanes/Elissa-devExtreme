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

  @Input() title: any;

  popupVisible = false;

  windowWidth : number; 
  windowHeight : number;

  details: any;
  detailsSubscription: Subscription;

  constructor(private detailPopUpService: DetailPopUpService) { 
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
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
    s= s.charAt(0).toUpperCase() + s.slice(1);
    return s.replaceAll('_', ' ');
  }

  isStatus(key: any): boolean{
      if(key.toUpperCase().indexOf('STATUS') == 0){
        return true;
      }else{
        return false;
      }
  }

  toUpperCase(value: any): string{
    if(value != null && typeof(value) == 'string' ){
      return value.toUpperCase();
    }else{
      return '';
    }
  }

  typeOf(value: any): any{
    if( value != null){
      return typeof(value);
    }else{
      return '';
    }
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
