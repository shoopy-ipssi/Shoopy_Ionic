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
  public data_scenarios: any
  
  constructor( private route: ActivatedRoute, private http: HttpClient, public gv: VariablesGlobales, private router: Router) {
    }
    
    
    typeTextAnimated(sentence) {
      var ele = '<span>' + sentence.split('').join('</span><span>') + '</span>';
      
      $('#block_att').empty()
      $(ele).hide().appendTo('#block_att').each(function (i) {
          $(this).delay(50 * i).css({
              display: 'inline',
              opacity: 0
          }).animate({
              opacity: 1
          }, 100);
      });
      }

    InitDataScenario(data){
      let data_temp = []
      data.forEach(element => {
        data_temp[element._id] = element
      });
      this.data_scenarios = data_temp
      return this.data_scenarios
    }

    loadNextStep(id_etape){
      let etape = this.data_scenarios[id_etape]
      this.typeTextAnimated(etape.text)
      let cnt = etape.childrens.length
      let choice = ""
      etape.childrens.forEach(child => {
        choice = choice +`<ion-button id="${child}" style='width:${100/cnt}%; margin:0%'>${this.data_scenarios[child].action}</ion-button>`
      })
      $('#block_choice').empty().html(choice)
      etape.childrens.forEach(child =>{
        $(`#${child}`).on('click', (event: JQuery.Event) => { this.loadNextStep(child); });
      })
    }
    private user = []
  
    ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get(`${this.gv.apiUrl}user`, data).subscribe(results => {
      this.user = results[0]; 
    });
    this.http.get(`${this.gv.mongUrl}scenario`).subscribe((res: Response) => { this.scenario = res
    this.InitDataScenario(this.scenario)
    this.loadNextStep(this.scenario[0]._id)
    console.log(this.scenario[0]._id)
  }

    );
    
  }


}
