import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';


@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent implements OnInit {
  private UID = sessionStorage.getItem('UID')
  headers: any
  mongURL: string
  config: any;
  public searchTitle;
  public searchTag;
  public scenarios;
  public stateScenarios;
  //Scenarios non-terminés
  public unfinishedDetail = []
  //Scenarios terminés
  public finishedDetail = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private gv: VariablesGlobalesComponent) {    
    this.config = {
      currentPage: 1,
      itemsPerPage: 25,
    };
    this.route.queryParamMap.pipe(map(params => params.get('page'))).subscribe(page => this.config.currentPage = page);
   }
  
  getScenarios(){
    this.http.get(this.gv.apiUrl+'scenarios', { headers: this.gv.headers }).subscribe((res: Response) => { 
      this.scenarios = res;
      this.getUnfinishedScenarios();
      this.getFinishedScenarios();
    });
  }
  getFinishedScenarios(){
    this.getStatedScenarios(1);
  }
  getUnfinishedScenarios(){
    this.getStatedScenarios(0);
  }
  getStatedScenarios(state:number){
    let data = []
    this.http.get(this.gv.apiUrl+'saves', {params:{iduser: this.UID}}).subscribe((res: Response) => { 
      this.stateScenarios = res;
      this.stateScenarios.map(element => {
        if (element.isFinished.data[0] == state) {
          this.scenarios.map(item => {
            if (element.id_scenario === item.id){
              let data_p = {item:item, id_step: element.id_step, id_save: element.id_save} 
              data.push(data_p)
            }
          })
        }
      })
      switch (state){
        case 1:
          this.finishedDetail = data;
          break;
        case 0:
          this.unfinishedDetail = data;
          break;
      }
    });
  }
  ngOnInit() {
    this.getScenarios();
  }
}
