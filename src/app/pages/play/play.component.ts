import { Component, OnInit, Renderer2, ElementRef, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesComponent  } from '../../variables-globales/variables-globales.component';
import { Router } from '@angular/router';
import * as $ from 'jquery'



@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
@Directive({
  selector: 'appchoice'
})
export class PlayComponent implements OnInit {
  public id: any;
  public id_step= ''
  public scenario: any;
  public data
  public data_scenarios: any
  public id_etape: any
  public saveExist = false
  public idSave: any
  public isFinished = false
  constructor( private route: ActivatedRoute, private http: HttpClient, public gv: VariablesGlobalesComponent, private router: Router, private renderer: Renderer2, private el:ElementRef) {
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
      this.id_etape = id_etape;
      let etape = this.data_scenarios[id_etape]
      this.typeTextAnimated(etape.text)
      let cnt = etape.childrens.length
      let choice = ""
      if (cnt > 0){
        etape.childrens.forEach(child => {
          choice = choice +`<ion-button id="${child}" class="ion-text-wrap" style='width:${100/cnt}%; margin:0%; height:100%'><p style="margin-top:1rem!important">${this.data_scenarios[child].action}</p></ion-button>`
        })
        $('#block_choice').empty().html(choice)
        //this.renderer.appendChild(document.getElementById('block_att'), choice)
        etape.childrens.forEach(child =>{
          $(`#${child}`).on('click', (event: JQuery.Event) => { this.loadNextStep(child); });
        })
      } else {
        this.isFinished = true
        $('#block_choice').empty().html(`<ion-button id="end" class="ion-text-wrap" style="width:100%"><p>Fin</p></ion-button>`);
        $(`#end`).on('click', (event: JQuery.Event) => { this.router.navigate(['pages/Scenario']) });
      }
      this.saveStep()
    }

    createSave(){
      const data = {id_scenario:this.data_scenarios[this.id_etape].scenario_id ,id_step:this.id_etape, id_user:sessionStorage.getItem('UID')}
      this.http.post(`${this.gv.apiUrl}save`, data, {headers: this.gv.headers}).subscribe((res: Response) => { 
        this.idSave = res.insertId
        if (parseInt("0"+this.idSave)> 0){
          this.saveExist = true
        }
      })
    }
    updateSave(){
      const data = {id_scenario:this.data_scenarios[this.id_etape].scenario_id ,id_step:this.id_etape, id_user:sessionStorage.getItem('UID'), isFinished: this.isFinished}
      this.http.put(`${this.gv.apiUrl}save/${this.idSave}`, data, {headers: this.gv.headers}).subscribe((res: Response) => {
      })
    }
    saveStep(){ 
      if (!this.saveExist){
        this.createSave()
      } 
      else {
        this.updateSave()
      }      
    }
  
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.id_step = this.route.snapshot.paramMap.get('id_step') || ''
      this.idSave = parseInt(0+this.route.snapshot.paramMap.get('idSave') || '')
      if (this.idSave > 0) {
        this.saveExist = true
      }
      this.gv.getUser()
      this.http.get(`${this.gv.mongUrl}scenario`, {params: {id: this.id}}).subscribe((res: Response) => { this.scenario = res
      this.InitDataScenario(this.scenario)
      if (this.id_step != '') { this.loadNextStep(this.id_step)}
      else { this.loadNextStep(this.scenario[0]._id)}
    });
  }


}
