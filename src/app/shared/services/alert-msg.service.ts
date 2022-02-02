import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMsgService {

  displayAlertMsg: boolean;
  displayAlertMsgSubject: Subject<boolean>;

  title: string;
  titleSubject: Subject<string>;

  msg: string;
  msgSubject: Subject<string>;

  constructor() { 
    this.displayAlertMsg = false;
    this.displayAlertMsgSubject = new Subject<boolean>();

    this.title = '';
    this.titleSubject = new Subject<string>();

    this.msg = '';
    this.msgSubject = new Subject<string>();
  }

  emitDisplayAlertMsg(): void{
    this.displayAlertMsgSubject.next(this.displayAlertMsg);
  }

  emitTitle(): void{
    this.titleSubject.next(this.title);
  }

  emitMsg(): void{
    this.msgSubject.next(this.msg);
  }

  afficherDisplayAlertMsg(): void{
    this.displayAlertMsg = true;
    this.emitDisplayAlertMsg();
  }  

  cacherDisplayAlertMsg(): void{
    this.displayAlertMsg = false;
    this.emitDisplayAlertMsg();
  }

  setTitle(newTitle: string): void{
    this.title = newTitle;
    this.emitTitle();
  }

  setMsg(newMsg: string): void{
    this.msg = newMsg;
    this.emitMsg();
  }
  
}
