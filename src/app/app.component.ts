import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private pseudo = "Akama40K"
  public appPages = [
    {
      title: 'Accueil',
      url: 'pages/home',
      techTitle: 'home',
      icon: 'home'
    },
    {
      title: 'Annonces',
      url: 'pages/listOffers',
      techTitle: 'listOffers',
      icon: 'list'
    },
    {
      title: 'Publier une annonce',
      url: 'pages/addOffer',
      techTitle: 'addOffer',
      icon: 'add'
    },
    {
      title: 'Mon Profil',
      url: 'pages/MyProfil',
      icon: 'happy'
    },
    {
      title: 'Mes Amis',
      url: 'pages/MyFriends',
      icon: 'person'
    },
    {
      title: 'Scénario',
      url: 'pages/Scenario',
      icon: 'journal'
    },
    {
      title: 'Déconnection',
      url: 'pages/Disconnect',
      icon: 'remove-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('pages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.techTitle === path);
    }
  }
}
