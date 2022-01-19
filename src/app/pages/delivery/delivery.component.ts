import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryService } from 'src/app/shared/services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  deliverys: any[];
  
  deliverysSubscription: Subscription;

  popupVisible = false;

  closeButtonOptions: any;
  constructor(private deliveryService: DeliveryService) { 
    this.deliverysSubscription = new Subscription();
    this.deliverys = [];

  }

  async ngOnInit(): Promise<void> {
    await this.deliveryService.getdeliverys();
    this.deliverysSubscription = this.deliveryService.deliverisSubject.subscribe(data => {
      console.log(data)
      this.deliverys = data.deliverys;
    });
    this.deliveryService.emitDeliveris();
  }

}
