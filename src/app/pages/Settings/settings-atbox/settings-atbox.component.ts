import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SettingsAtboxService } from 'src/app/shared/services/settings-atbox.service';

@Component({
  selector: 'app-settings-atbox',
  templateUrl: './settings-atbox.component.html',
  styleUrls: ['./settings-atbox.component.scss']
})
export class SettingsAtboxComponent implements OnInit {

  settingsAtbox: any[];
  settingsAtboxSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();


  constructor(private settingsAtboxService: SettingsAtboxService) {
    this.settingsAtbox = [];
    this.settingsAtboxSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.settingsAtboxSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {

    await this.settingsAtboxService.getAllsettingsAtbox();
    this.settingsAtboxSubscription = this.settingsAtboxService.settingsAtboxSubject.subscribe(data => {
      this.settingsAtbox = data.atboxs;
    });
    this.settingsAtboxService.emitSettingsAtbox();

  }

  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'atbox', 'id': cell.data.ID_AT_Box});
  }

}
