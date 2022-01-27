import { LoadingService } from './shared/services/loading.service';
import { Component, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  displayLoading : boolean;
  displayLoadingSubscription : Subscription;

  constructor(private authService: AuthService, 
              private screen: ScreenService, 
              public appInfo: AppInfoService,
              private loadingService: LoadingService) { 
    
    this.displayLoading = false;
    this.displayLoadingSubscription = this.loadingService.displayLoadingSubject.subscribe(data => {
      this.displayLoading = data;
    });
    this.loadingService.emitDisplayLoading();
    
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
