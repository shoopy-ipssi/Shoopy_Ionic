import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offersList: Offer[];

  constructor() {
    this.offersList = [
      new Offer(uuidv4(), "T3 exposé sud", 600000, "Paris", "assets/img/salonT3.jpg", "Très bel appartement orienté sud ; composé de 2 chambres ; salon salle à manger cave et garage.","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
      new Offer(uuidv4(), "Appartement neuf", 234000, "Orléans", "assets/img/planAppart.jpg", "", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
      new Offer(uuidv4(), "T3 Lumineux", 179000, "Reims - Secteur Jean Jaurès", "assets/img/T3Reims.jpg", " Bel appartement, idéalement situé, proche du centre ville et de tous commerces. Refait à neuf.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    ];
  }

  public getOffers(): Offer[] {
    return this.offersList;
  }

  public getOfferById(offerId: string) : Offer {
    return this.offersList.find(elmt => elmt.getId() == offerId);
  }

  public addOffer(offer: Offer) {
    this.offersList.push(offer);
  }
}
