import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
  
  public FpData: FormGroup;
  public correctMail: boolean
  public sendmail: boolean
  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router, public EncrDecr: EncrDecrService, public gv: VariablesGlobales) {
    this.correctMail = true
    this.sendmail = false
  }
  async SendMailFp(){
    if (this.FpData.value.email == "") { this.correctMail = false }
    else {
      const data = { params: this.FpData.value}
      this.http.get(`${this.gv.apiUrl}userByMail`, data).subscribe(result => {
        if (result[0].length == 0){
          this.correctMail = false
        }
        else {
          const encrypt_user = this.EncrDecr.set('123456$#@$^@1ERF', result[0].id)
          const linkEncrypt = `${this.gv.FoUrl}newPassword/${encrypt_user.split('/').join('__').split('=').join('-_-')}`
          const dataMail = {EmailUser: result[0].email, NameUser: result[0].username, linkEncrypt: linkEncrypt}
          this.http.post(`${this.gv.apiUrl}forgottenPassword`, dataMail, {headers: this.gv.headers}).subscribe(result => {
            this.sendmail = true
          })
        }
      })
    }
    
  }
  ngOnInit() {
    this.FpData = this.fb.group({
      email: ['', Validators.email], // la chaîne de caractères est la valeur par défaut du champ
    });
  }

}
