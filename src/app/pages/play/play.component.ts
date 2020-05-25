import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobales  } from '../../variables-globales/variables-globales.component';
import { Router } from '@angular/router';
import * as $ from 'jquery'

const UID = sessionStorage.getItem('UID')
const data = { params: {userID: UID}} 


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  id: any;
  scenario: any;
  public data
  
  constructor( private route: ActivatedRoute, private http: HttpClient, public gv: VariablesGlobales, private router: Router) {
    }
    
    typeTextAnimated(sentence) {
      var ele = '<span>' + sentence.split('').join('</span><span>') + '</span>';
      
      
      $(ele).hide().appendTo('#block_att').each(function (i) {
          $(this).delay(100 * i).css({
              display: 'inline',
              opacity: 0
          }).animate({
              opacity: 1
          }, 100);
      });
      }
      
    private user = []
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get(`${this.gv.apiUrl}user`, data).subscribe(results => {
      this.user = results[0]; 
    });
    this.http.get(`${this.gv.mongUrl}scenario`).subscribe((res: Response) => { this.scenario = res
    this.data = this.scenario[0].text
    this.typeTextAnimated(this.data)}
    );
    
  }


}
