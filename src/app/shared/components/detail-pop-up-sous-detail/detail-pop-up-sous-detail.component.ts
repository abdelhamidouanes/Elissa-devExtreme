import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-pop-up-sous-detail',
  templateUrl: './detail-pop-up-sous-detail.component.html',
  styleUrls: ['./detail-pop-up-sous-detail.component.scss']
})
export class DetailPopUpSousDetailComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
