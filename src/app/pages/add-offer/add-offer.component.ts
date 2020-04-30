import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/models/offer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {

  private title: string;
  private description: string;
  private price: number;
  private sellingPlace: string;
  private longDescription: string;

  constructor(private offerService: OfferService) { }

  ngOnInit() {}

  submitForm() {
    this.offerService.addOffer(new Offer(uuidv4(), this.title, this.price, this.sellingPlace, "assets/img/no-image.png", this.description, this.longDescription));
  }
}
