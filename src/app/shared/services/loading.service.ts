import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  displayLoading: boolean;
  displayLoadingSubject: Subject<boolean>;

  constructor() { 
    this.displayLoading = false;
    this.displayLoadingSubject = new Subject<boolean>();
  }

  emitDisplayLoading(): void{
    this.displayLoadingSubject.next(this.displayLoading);
  }

  afficherDisplayLoading(): void{
    this.displayLoading = true;
    this.emitDisplayLoading();
  }  

  cacherDisplayLoading(): void{
    this.displayLoading = false;
    this.emitDisplayLoading();
  }

}
