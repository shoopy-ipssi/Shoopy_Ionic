import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from '../../services/crypto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  VariablesGlobalesComponent } from '../../variables-globales/variables-globales.component';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
})
export class ValidateAccountComponent implements OnInit {
  public decryptU
  public checkActivation = false
  constructor(public EncrDecr: EncrDecrService, public router: ActivatedRoute, public http: HttpClient, public gv: VariablesGlobalesComponent, public route: Router) { }

  validateAccount(){
    const data = {isActive: true}
    this.http.put(`${this.gv.apiUrl}updateuser/${this.decryptU}`, data, {headers: this.gv.headers}).subscribe(result => {
      if (result){
        this.checkActivation = true
      }
    })
  }
  ngOnInit() {
    const u = this.router.snapshot.paramMap.get('u')
    if (u != undefined){
    this.decryptU = this.EncrDecr.get('123456$#@$^@1ERF', u.split('-_-').join('=').split('__').join('/'))
    this.validateAccount()
    }
    else {
      alert('Lien d\'activation incorrect')
      //this.route.navigate['login']
    }
  }

}
