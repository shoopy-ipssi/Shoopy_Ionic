import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';


@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss'],
  providers: [VariablesGlobalesComponent]
})
export class LoadUsersComponent implements OnInit {
  public users:  any[any];
  public type_button = 1;
  private UID = sessionStorage.getItem('UID')
  public cnt = 0
  constructor(private http: HttpClient, public gv: VariablesGlobalesComponent) { }

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
    return this.http.get(`${this.gv.apiUrl}potential`, {params: {userID: this.UID}}).subscribe(results =>  {
      this.users = results;
    })
  }
  async getFriends(){
    this.type_button = 2
    this.activebutton()
    return this.http.get(`${this.gv.apiUrl}friends`, { params: {userID: this.UID}}).subscribe(results => {
      this.users = results;
    })
  }
  async getReceivedInvitation(){
    this.type_button = 3
    this.activebutton()
    return this.http.get(`${this.gv.apiUrl}recieve_invitation`, { params: {userID: this.UID}}).subscribe(results => {
      this.users = results[0];
    })
  }
  async getCountInvitation(){
    return this.http.get(`${this.gv.apiUrl}recieve_invitation`, { params: {userID: this.UID}}).subscribe(results => {
      this.cnt = results[0].length;
    })
  }
  async responseInvitation(type, id){
    const data = {typeResponse: type.trim(), idFriend: id, userID: this.UID}
    const headers = this.gv.headers

    if ((type === 'accept' || type ==='refuse') && parseInt(id) > 0) {
      return this.http.post(`${this.gv.apiUrl}recieve_invitation`, data, {headers: headers}).subscribe(results => {
        this.getCountInvitation()
        this.loadDetailContent()
      })
    }
  }
  async sendInvitation(id){
    const data = {userID: this.UID, idFriend: id}
    const headers = this.gv.headers

    if (parseInt(id) > 0){
      return this.http.post(`${this.gv.apiUrl}send_invitation`, data, {headers: headers}).subscribe(results => {
        this.getCountInvitation()
        this.loadDetailContent();
      })
    }

  }
  
  ngOnInit() {
    this.getCountInvitation()
    this.getPotentialFriends();
  }


}
