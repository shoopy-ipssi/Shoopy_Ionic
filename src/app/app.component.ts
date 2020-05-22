import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobales  } from './variables-globales/variables-globales.component';
import { Router } from '@angular/router';

sessionStorage.setItem('UID', '1')
const UID = sessionStorage.getItem('UID')

const data = { params: {userID: UID}} 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [VariablesGlobales ]
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
    private statusBar: StatusBar,
    private http: HttpClient,
    public gv: VariablesGlobales,
    private router: Router
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
    return this.http.get(`${this.gv.apiUrl}user`, data).subscribe(results => {
      this.user = results[0]; 
    })
  };
  ngOnInit() {
      this.gv.checkUserLogged()
      this.getUserMenu()
      const path = window.location.pathname.split('pages/')[1];
      if (path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(page => page.techTitle === path);
      }  
  }
}
