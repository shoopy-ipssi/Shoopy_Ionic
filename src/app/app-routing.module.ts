import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OffersListComponent } from './pages/offers-list/offers-list.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { PagesModule } from './pages/pages.module';
import { RegisterComponent } from './pages/register/register.component';
import { ScenarDetailsComponent } from './pages/scenar-details/scenar-details.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  { path: 'details', component: ScenarDetailsComponent },
  { path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
