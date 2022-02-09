import { Subscription } from 'rxjs';
import { SettingUserService } from './../../../shared/services/setting-user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-settings-users',
  templateUrl: './settings-users.component.html',
  styleUrls: ['./settings-users.component.scss']
})
export class SettingsUsersComponent implements OnInit, OnDestroy {

  userInformation : any;
  userInformationSubscription : Subscription;

  constructor(private settingUserService: SettingUserService) { 
    this.userInformationSubscription = new Subscription();
  }


  ngOnInit(): void {

    this.settingUserService.getUserInformation();

    this.userInformationSubscription = this.settingUserService.userInformationSubject.subscribe(data => {
      this.userInformation = data;
    });
    this.settingUserService.emitUserInformation();
    
  }

  ngOnDestroy(): void {
    this.userInformationSubscription.unsubscribe();
  }

  updateProfile(): void{

  }

}
