import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesComponent } from './variables-globales/variables-globales.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [VariablesGlobalesComponent ]
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
      title: 'Scénario',
      url: 'pages/Scenario',
      icon: 'journal'
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
      title: 'Paramètres',
      url: 'pages/Settings',
      icon: 'flower'
    },
    {
      title: 'Déconnexion',
      url: 'pages/Disconnect',
      icon: 'remove-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private http: HttpClient,
    public gv: VariablesGlobalesComponent,
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
    this.gv.getUser()
  };
  getUrl()
  {
    return `url('${this.gv.FoUrl}/assets/img/Lawachara_Forest.jpg')`;
  }
  ngOnInit() {
      this.getUserMenu()
      if (window.location.pathname.split('/')[1] != 'newPassword' && window.location.pathname.split('/')[1] != 'validateAccount' ) { this.gv.checkUserLogged() }
      
      const path = window.location.pathname.split('pages/')[1];
      if (path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(page => page.techTitle === path);
      }
      localStorage.setItem('Shoopy', '1');  
  }
}
