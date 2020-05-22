import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
@Component({
  selector: 'app-variables-globales',
  templateUrl: './variables-globales.component.html',
  styleUrls: ['./variables-globales.component.scss'],
})
export class VariablesGlobales {
  public apiUrl = 'https://shoopymysql.herokuapp.com/'
  public mongUrl = 'https://shoopymongo.herokuapp.com/'
  public headers = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  });
  public isLoggedIn = sessionStorage.getItem('isLoggedIn')
  constructor(private route: Router) {
  }
  checkUserLogged(){
    console.log('Check log state')
    if (!this.isLoggedIn){
      this.route.navigate(['/login'])
    }
  }
}
