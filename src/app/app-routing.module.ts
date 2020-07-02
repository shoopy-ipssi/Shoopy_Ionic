import { NgModule, ComponentRef } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagesModule } from './pages/pages.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlayComponent } from './pages/play/play.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ValidateAccountComponent } from './pages/validate-account/validate-account.component';
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
  },
  {
    path: 'forgotten-password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'newPassword/:u',
    component: NewPasswordComponent
  },
  {
    path: 'validateAccount/:u',
    component: ValidateAccountComponent
  },
  {
    path: 'play/:id',
    component: PlayComponent
  },
  {
    path: 'play/:id/:id_step/:idSave',
    component: PlayComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
