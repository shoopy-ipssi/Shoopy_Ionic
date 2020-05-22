import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
});

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent implements OnInit {
  config: any;
public scenarios;
public searchTitle;
public searchTag;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
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
