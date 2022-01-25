import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DeliveryService } from 'src/app/shared/services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  deliverys: any[];
  deliverysSubscription: Subscription;

  seeDetailSubject: Subject<any> = new Subject<any>();
  
  constructor(private deliveryService: DeliveryService) { 
    this.deliverysSubscription = new Subscription();
    this.deliverys = [];
  }

  async ngOnInit(): Promise<void> {
    await this.deliveryService.getdeliverys();
    this.deliverysSubscription = this.deliveryService.deliverisSubject.subscribe(data => {
      this.deliverys = data.deliverys;
    });
    this.deliveryService.emitDeliveris();
  }

  
  onSeeDetailClick(cell: any): void {
    this.seeDetailSubject.next({'page': 'delivery', 'id': cell.data.ID_delivery});
  }

}
