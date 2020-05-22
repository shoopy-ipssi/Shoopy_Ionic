import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent implements OnInit {
  headers: any
  mongURL: string
  config: any;
public scenarios;
public searchTitle;
public searchTag;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private gv: VariablesGlobales) {
    this.headers = this.gv.headers //IL EST LA TON HEADER POUR TES REQUETES
    this.mongURL = this.gv.mongUrl //TON URL MONGO <3
    this.config = {
      currentPage: 1,
      itemsPerPage: 25,
    };
    this.route.queryParamMap.pipe(map(params => params.get('page'))).subscribe(page => this.config.currentPage = page);

    this.scenarios = 
     [
    {
      id: 1,
      title: 'Dungeons & Dragons',
     description: 'road to an medieval fantastic adventure',
     tag: 'Medieval, Hardocre'},
     {
      id: 2, 
      title: 'Star Trek',
     description: 'road to an Science fiction adventure',
     tag: 'SF, Clingon'},
     {
      id: 3, 
      title: 'Zombicide',
     description: 'BRAAAIIIIIIIIN',
     tag: 'Horror, Survival'},
     
    ]
    
   }
 
  ngOnInit() {}

}
