import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { SettingsComponent } from './settings/settings.component';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { LoadUsersComponent } from './load-users/load-users.component';
import { HttpClientModule } from '@angular/common/http';
import { ScenarioPipe } from './scenario/scenario.pipe';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'addOffer', component: AddOfferComponent},
      { path: 'MyFriends', component: MyFriendsComponent},
      { path: 'Scenario', component: ScenarioComponent},
      { path: 'MyProfil', component: MyProfilComponent},
      { path: 'Settings', component: SettingsComponent},
      { path: 'Disconnect', component: DisconnectComponent},

    ]
  }
];

@NgModule({
  declarations: [HomeComponent, AddOfferComponent, MyFriendsComponent,
    ScenarioComponent, MyProfilComponent, SettingsComponent, DisconnectComponent, LoadUsersComponent, ScenarioPipe],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PagesModule { }
