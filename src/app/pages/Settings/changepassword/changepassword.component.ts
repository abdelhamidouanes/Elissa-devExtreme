import { Component, OnInit, ViewChild } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';
import { SettingUserService } from 'src/app/shared/services/setting-user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild(DxValidatorComponent, { static: false }) currentPasswordValidator : any;
  @ViewChild(DxValidatorComponent, { static: false }) newPasswordValidator : any;
  @ViewChild(DxValidatorComponent, { static: false }) confirmPasswordValidator : any;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(private settingUserService: SettingUserService) { 
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  passwordComparison = () => this.newPassword;

  ngOnInit(): void {
  }

  updatePassword(): void{
    if(this.currentPasswordValidator.instance.validate().isValid && this.newPasswordValidator.instance.validate().isValid && this.confirmPasswordValidator.instance.validate().isValid){
      this.settingUserService.changePassword(this.currentPassword, this.newPassword);
    }
  }

}
