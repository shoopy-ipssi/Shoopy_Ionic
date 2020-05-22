import { NgModule, ComponentRef } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagesModule } from './pages/pages.module';
import { RegisterComponent } from './pages/register/register.component';
import { ScenarDetailsComponent } from './pages/scenar-details/scenar-details.component';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  
  { path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
