import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { data } from 'jquery';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public RegisterData: FormGroup;
  public session: Response;
  public log: any;
  public sendMail: boolean
  public emailAlready: boolean
  public usernameAlready: boolean
  constructor (public http: HttpClient, public fb: FormBuilder, public router: Router, public EncrDecr: EncrDecrService, public gv: VariablesGlobalesComponent) {
    this.sendMail = false
  }
  ngOnInit() {
    this.RegisterData = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // la chaîne de caractères est la valeur par défaut du champ
      password: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  sendMailRegister(idU){
    const dataForm = this.RegisterData.value
    const id = idU
    const encrypt_user = this.EncrDecr.set('123456$#@$^@1ERF', id)
    const linkEncrypt = `${this.gv.FoUrl}validateAccount/${encrypt_user.split('/').join('__').split('=').join('-_-')}`
    const data = {EmailUser : dataForm.email, NameUser: dataForm.username, linkEncrypt: linkEncrypt}
    this.http.post(`${this.gv.apiUrl}createaccount`, data, {headers: this.gv.headers}).subscribe(result => {
      if (result){
        this.sendMail = true
      }
    })
  }
  async Register() {
    let data_res:any
    if (this.RegisterData.status == 'VALID'){
      const datas = this.RegisterData.value;
      datas.password = this.EncrDecr.set(this.gv.cryptVal, datas.password)
      this.http.post(`${this.gv.apiUrl}checkuser`, {username: datas.username, email: datas.email}, {headers: this.gv.headers}).subscribe(res=>{
        data_res = res[0]
        if (data_res.username > 0){
          this.usernameAlready = true
        } else {
          this.usernameAlready = false
        }
        if (data_res.email > 0){
          this.emailAlready = true
        } else {
          this.emailAlready = false
        }
        if (!this.emailAlready && !this.usernameAlready){
          this.http.post(`${this.gv.apiUrl}createuser`, datas, { headers: this.gv.headers }).subscribe((res: Response) => {
            this.log = res;
            if (this.log !== undefined) {
              this.sendMailRegister(this.log.insertId)
              //this.Signin()
            } else {
              this.router.navigate(['']);
            }
          });
        }
      })
    } else {
      alert('Merci de remplir tous les champs')
    }   
  }
}