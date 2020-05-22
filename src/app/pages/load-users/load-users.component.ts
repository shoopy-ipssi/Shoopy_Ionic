import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';

const apiUrl = 'https://shoopymysql.herokuapp.com/'
const UID = sessionStorage.getItem('UID')
const headers = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");

@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss'],
})
export class LoadUsersComponent implements OnInit {
  private users:  any;
  private type_button = 1
  constructor(private http: HttpClient) { }

  loadDetailContent(){
    if (this.type_button == 1) this.getPotentialFriends();
    if (this.type_button == 3) this.getReceivedInvitation();
    if (this.type_button == 2) this.getFriends();  
  }
  activebutton() {
    document.getElementById('type_2').setAttribute('color', 'secondary')
    document.getElementById('type_3').setAttribute('color', 'secondary')
    document.getElementById('type_1').setAttribute('color', 'secondary')
    document.getElementById(`type_${this.type_button}`).setAttribute('color', 'primary')
  }

  async getPotentialFriends(){
    this.type_button = 1
    this.activebutton()
    return this.http.get(`${apiUrl}potential`, {params: {userID: UID}}, {headers: headers}).subscribe(results =>  {this.users = results; console.log(this.users)})
  }
  async getFriends(){
    this.type_button = 2
    this.activebutton()
    return this.http.get(`${apiUrl}friends`, { params: {userID: UID}}, {headers: headers}).subscribe(results => {this.users = results[0]; console.log(this.users)})
  }
  async getReceivedInvitation(){
    this.type_button = 3
    this.activebutton()
    return this.http.get(`${apiUrl}recieve_invitation`, { params: {userID: UID}}, {headers: headers}).subscribe(results => {this.users = results; console.log(this.users)})
  }
  async responseInvitation(type, id){
    if ((type === 'accept' || type ==='refuse') && parseInt(id) > 0) {
      return this.http.post(`${apiUrl}recieve_invitation`, {typeResponse: type.trim(), idFriend: id, userID: UID}, {headers: headers}).subscribe(results => {
        console.log(results);
        this.loadDetailContent()
      })
    }
  }
  async sendInvitation(id){
    if (parseInt(id) > 0){
      return this.http.post(`${apiUrl}send_invitation`, {userID: UID, idFriend: id}, {headers: headers}).subscribe(results => {
        console.log(results);
        this.loadDetailContent();
      })
    }

  }
  
  ngOnInit() {
    this.getPotentialFriends();
  }


}
