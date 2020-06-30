import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.scss'],
})
export class ValidateAccountComponent implements OnInit {
  public decryptU
  public checkActivation = false
  constructor(public EncrDecr: EncrDecrService, public router: ActivatedRoute, public http: HttpClient, public gv: VariablesGlobalesComponent) { }

  validateAccount(){
    const data = {isActive: true}
    this.http.post(`${this.gv.apiUrl}updateuser/${this.decryptU}`, data, {headers: this.gv.headers}).subscribe(result => {
      if (result){
        this.checkActivation = true
      }
    })
  }
  ngOnInit() {
    this.decryptU = this.EncrDecr.get('123456$#@$^@1ERF', this.router.snapshot.paramMap.get('u').split('-_-').join('=').split('__').join('/'))
  }

}
