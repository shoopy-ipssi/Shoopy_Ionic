import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
sessionStorage.setItem('UID', '1')
let apiUrl = 'http://localhost:3000/'
const UID = sessionStorage.getItem('UID')
@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss'],
})
export class LoadUsersComponent implements OnInit {
  private users:  any[];
  private type_button = 1
  constructor(private http: HttpClient) { }

  async getPotentialFriends(){
    this.type_button = 1
    return this.http.get(`${apiUrl}potential`, {params: {userID: UID}}).subscribe(results =>  {this.users = results; console.log(this.users)})
  }
  async getFriends(){
    this.type_button = 2
    return this.http.get(`${apiUrl}friends`, { params: {userID: UID}}).subscribe(results => {this.users = results; console.log(this.users)})
  }
  async getReceivedInvitation(){
    this.type_button = 3
    return this.http.get(`${apiUrl}recieve_invitation`, {params: {userID: UID}}).subscribe(results => {this.users = results; console.log(this.users)})
  }
  ngOnInit() {
    this.getPotentialFriends();
  }


}
