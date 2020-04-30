import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OfferComponent } from './offer/offer.component';
import { FormsModule } from '@angular/forms';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { SettingsComponent } from './settings/settings.component';
import { DisconnectComponent } from './disconnect/disconnect.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'listOffers', component: OffersListComponent},
      { path: 'addOffer', component: AddOfferComponent},
      { path: 'offerDetails/:id', component: OfferDetailsComponent},
      { path: 'MyFriends', component: MyFriendsComponent},
      { path: 'Scenario', component: ScenarioComponent},
      { path: 'MyProfil', component: MyProfilComponent},
      { path: 'Settings', component: SettingsComponent},
      { path: 'Disconnect', component: DisconnectComponent},

    ]
  }
];

@NgModule({
  declarations: [HomeComponent, OffersListComponent, OfferDetailsComponent, AddOfferComponent, OfferComponent, MyFriendsComponent,
    ScenarioComponent, MyProfilComponent, SettingsComponent, DisconnectComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PagesModule { }
