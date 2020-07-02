import { Component, OnInit, Renderer2, ElementRef, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesGlobalesComponent  } from '../../variables-globales/variables-globales.component';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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
  public loading: boolean
  public scenario: any;
  public data
  public data_scenarios: any
  public id_etape: any
  public saveExist = false
  public idSave: any
  public isFinished = false
  public choice: any
  constructor( private route: ActivatedRoute, private http: HttpClient, public gv: VariablesGlobalesComponent, private router: Router, private renderer: Renderer2, private el:ElementRef) {
    this.loading = false  
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
      let data_step = []
      if (cnt > 0){
        etape.childrens.map(child => {
          data_step.push({child: child, action :this.data_scenarios[child].action})
        })
      }
      else {
        this.isFinished = true
      }
      this.choice = data_step
      this.saveStep()
    }

    createSave(){
      const data = {id_scenario:this.data_scenarios[this.id_etape].scenario_id ,id_step:this.id_etape, id_user:sessionStorage.getItem('UID')}
      this.http.post(`${this.gv.apiUrl}save`, data, {headers: this.gv.headers}).subscribe((res: Response) => { 
        this.idSave = res
        if (parseInt("0"+this.idSave.id)> 0){
          this.saveExist = true
        }
      })
    }
    updateSave(){
      const data = {id_scenario:this.data_scenarios[this.id_etape].scenario_id ,id_step:this.id_etape, id_user:sessionStorage.getItem('UID'), isFinished: this.isFinished}
      this.http.put(`${this.gv.apiUrl}save/${this.idSave}`, data, {headers: this.gv.headers}).subscribe((res: Response) => {
      })
    }
    endScenario(){
      this.router.navigate(['pages/Scenario'])
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
      this.loading = true
      this.http.get(`${this.gv.mongUrl}scenario/` + this.id).subscribe((res: Response) => { 
        this.scenario = res
      this.InitDataScenario(this.scenario)
      if (this.id_step != '') { 
        this.loadNextStep(this.id_step)
      }
      else { 
        if (this.scenario[0] != undefined){
          this.loadNextStep(this.scenario[0]._id)
        }
      }
    });
  }


}
