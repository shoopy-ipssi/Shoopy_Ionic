import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData, APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayComponent } from './pages/play/play.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ValidateAccountComponent } from './pages/validate-account/validate-account.component';
import { VariablesGlobalesComponent } from './variables-globales/variables-globales.component';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
     LoginComponent, 
     PlayComponent, 
     ForgottenPasswordComponent, 
     NewPasswordComponent, 
     ValidateAccountComponent, 
     VariablesGlobalesComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
