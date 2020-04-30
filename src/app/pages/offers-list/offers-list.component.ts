import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss'],
})
export class OffersListComponent implements OnInit {

  public offers : Offer[];

  constructor(private router: Router, private offerService: OfferService) {
    this.offers = this.offerService.getOffers();
 }

  ngOnInit() {
  }

  handleOfferClick(offer: Offer) {
    this.router.navigate(['pages/offerDetails', offer.getId()]);
  }
}