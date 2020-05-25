import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
@Component({
  selector: 'app-variables-globales',
  templateUrl: './variables-globales.component.html',
  styleUrls: ['./variables-globales.component.scss'],
})
export class VariablesGlobales {
  public user : any[]
  public apiUrl = 'https://shoopymysql.herokuapp.com/'
  public mongUrl = 'https://shoopymongo.herokuapp.com/'
  public headers = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
  });
  public isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false')
  
  constructor(private route: Router, private http: HttpClient) {
  }
  checkUserLogged(){
    if (!this.isLoggedIn && !this.route.url.startsWith("/register")){
      this.route.navigate(['/login'])
    }
  }
  setisLoggedIn(){
    this.isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false')
  }
  getisLoggedIn(){
    return this.isLoggedIn
  }
  changelsLog(state){
    localStorage.setItem('loggedIn', state)
    this.setisLoggedIn()
  }
  getUser(){
    const data = { params: {userID: sessionStorage.getItem('UID')}} 
    return this.http.get(`${this.apiUrl}user`, data).subscribe(results => {
      this.user = results[0]
      console.log(this.user)
    })
  }
}
