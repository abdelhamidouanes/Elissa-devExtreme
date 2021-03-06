import { Subscription } from 'rxjs';
import { SettingUserService } from './../../../shared/services/setting-user.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-settings-users',
  templateUrl: './settings-users.component.html',
  styleUrls: ['./settings-users.component.scss']
})
export class SettingsUsersComponent implements OnInit, OnDestroy {
  @ViewChild(DxValidatorComponent, { static: false }) loginValidator : any;
  @ViewChild(DxValidatorComponent, { static: false }) emailValidator : any;

  userInformation : any;
  userInformationSubscription : Subscription;

  login: any;
  email: any;

  constructor(private settingUserService: SettingUserService, private authService: AuthService) { 
    this.userInformationSubscription = new Subscription();
  }


  async ngOnInit(): Promise<void> {

    await this.settingUserService.getUserInformation();

    this.userInformationSubscription = this.settingUserService.userInformationSubject.subscribe(data => {
      this.userInformation = data;
      this.login = this.userInformation.Login;
      this.email = this.userInformation.email;
    });
    this.settingUserService.emitUserInformation();
    
  }

  ngOnDestroy(): void {
    this.userInformationSubscription.unsubscribe();
  }

  async updateProfile(): Promise<void>{
    if(this.loginValidator.instance.validate().isValid && this.emailValidator.instance.validate().isValid && (this.login!=this.userInformation.Login || this.email!=this.userInformation.email)){
      if(await this.settingUserService.updateProfile(this.login, this.email)){
        this.userInformation.Login = this.login;
        this.userInformation.email = this.email;
      }
      await this.authService.verifyApiKey();
    }
  }

}
