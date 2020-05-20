import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';


sessionStorage.setItem('UID', '1')
const UID = sessionStorage.getItem('UID')
const apiUrl = 'https://shoopymysql.herokuapp.com/'
const data = { params: {userID: UID}}
const headers = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  private user = []
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
      title: 'Paramètres',
      url: 'pages/Settings',
      icon: 'flower'
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
    private statusBar: StatusBar,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  };
  getUserMenu(){
    console.log("load_information"+UID);
    return this.http.get(`${apiUrl}user`, data, headers).subscribe(results => {this.user = results[0]; console.log(this.user)})
  };
  ngOnInit() {
    const path = window.location.pathname.split('pages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.techTitle === path);
    }
    this.getUserMenu()
  }
}
