import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.scss'],
})
export class DisconnectComponent implements OnInit {

  constructor(public router: Router, private gv: VariablesGlobales) { }

  ngOnInit() {
    this.gv.checkUserLogged()
    this.Logout()
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
