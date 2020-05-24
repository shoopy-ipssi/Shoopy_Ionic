import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobales  } from '../../variables-globales/variables-globales.component';
import { Router } from '@angular/router';

const UID = sessionStorage.getItem('UID')
const data = { params: {userID: UID}} 

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  id: any;

  constructor( private route: ActivatedRoute, private http: HttpClient, public gv: VariablesGlobales, private router: Router) {
    }
    private user = []
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    return this.http.get(`${this.gv.apiUrl}user`, data).subscribe(results => {
      this.user = results[0]; 
    })
  }


}
