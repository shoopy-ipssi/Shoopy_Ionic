import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
public searchTitle;
public searchTag;
public scenarios;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private gv: VariablesGlobales) {
    this.headers = this.gv.headers //IL EST LA TON HEADER POUR TES REQUETES
    this.mongURL = this.gv.mongUrl //TON URL MONGO <3
    
    this.config = {
      currentPage: 1,
      itemsPerPage: 25,
    };
    this.route.queryParamMap.pipe(map(params => params.get('page'))).subscribe(page => this.config.currentPage = page);
   }

  ngOnInit() {
    this.http.get(this.gv.apiUrl+'scenarios', { headers: this.gv.headers }).subscribe((res: Response) => { this.scenarios = res});
  }

}
