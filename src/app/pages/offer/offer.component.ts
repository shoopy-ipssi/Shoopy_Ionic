import { Component, OnInit, Input } from '@angular/core';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {

  @Input() offerToDisplay: Offer;

  constructor() { }

  ngOnInit() {
  }

}
