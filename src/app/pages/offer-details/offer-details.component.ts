import { Component, OnInit, Input } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {

  public offerToDisplay : Offer;

  constructor(private activatedRoute: ActivatedRoute, 
              private offerService: OfferService) { }

  ngOnInit() {
    let offerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.offerToDisplay = this.offerService.getOfferById(offerId);
  }

}
