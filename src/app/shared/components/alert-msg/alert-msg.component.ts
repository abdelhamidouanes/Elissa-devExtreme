import { AlertMsgService } from './../../services/alert-msg.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.scss']
})
export class AlertMsgComponent implements OnInit, OnDestroy {


  title: string;
  titleSubscription: Subscription;

  msg: string;
  msgSubscription: Subscription;

  popupVisible : boolean;
  popupVisibleSubscription: Subscription;

  constructor(private alertMsgService: AlertMsgService) { 
    this.title = '';
    this.titleSubscription = new Subscription();

    this.msg = '';
    this.msgSubscription = new Subscription();

    this.popupVisible = false;
    this.popupVisibleSubscription = new Subscription();
  }


  ngOnInit(): void {
    this.titleSubscription = this.alertMsgService.titleSubject.subscribe(data => {
      this.title = data;
    });
    this.alertMsgService.emitTitle();

    this.msgSubscription = this.alertMsgService.msgSubject.subscribe(data => {
      this.msg = data;
    });
    this.alertMsgService.emitMsg();

    this.popupVisibleSubscription = this.alertMsgService.displayAlertMsgSubject.subscribe(data => {
      this.popupVisible = data;
    });
    this.alertMsgService.emitDisplayAlertMsg();
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
    this.msgSubscription.unsubscribe();
  }


  closePopUp(): void{
    this.popupVisible = false;
  }

}
