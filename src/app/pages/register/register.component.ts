import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public RegisterData: FormGroup;
  public session: Response;
  public log: Response;
  public sendMail: boolean
  constructor (public http: HttpClient, public fb: FormBuilder, public router: Router, public EncrDecr: EncrDecrService, public gv: VariablesGlobales) {
    this.sendMail = false
  }
  ngOnInit() {
    this.RegisterData = this.fb.group({
      email: ['', Validators.required], // la chaîne de caractères est la valeur par défaut du champ
      password: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  async Validate() {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (this.RegisterData.value.email.match(emailRegex)) {
      const decrypted = this.RegisterData.value.password
      if (decrypted == this.log[0].password) {
        const email = sessionStorage.setItem('email', this.log[0].email);
        sessionStorage.setItem('UID', this.log[0].id)
      } else {
        alert('Mot de passe incorrect')
      }
    } else {
      alert('Email incorrect')
    }
    this.gv.changelsLog('true')
    if (this.gv.getisLoggedIn()){
      this.gv.getUser()
      this.router.navigate(['']);
    }
  }
  sendMailRegister(){
    const dataForm = this.RegisterData.value
    const encrypt_user = this.EncrDecr.set('123456$#@$^@1ERF', this.log[0].id)
    const linkEncrypt = `${this.gv.FoUrl}validateAccount/${encrypt_user.split('/').join('__').split('=').join('-_-')}`
    const data = {EmailUser : dataForm.email, NameUser: dataForm.username, linkEncrypt: linkEncrypt}
    this.http.post(`${this.gv.apiUrl}createaccount`, data, {headers: this.gv.headers}).subscribe(result => {
      console.log(result)
      if (result){
        this.sendMail = true
      }
    })
  }
  async Register() {
    const datas = this.RegisterData.value;
    datas.password = this.EncrDecr.set(this.gv.cryptVal, datas.password)
    this.http.post(`${this.gv.apiUrl}createuser`, datas, { headers: this.gv.headers }).
      subscribe((res: Response) => {
        this.log = res;
        console.log(res)
        if (this.log[0] !== undefined) {
          this.sendMailRegister()
          //this.Signin()
        } else {
          this.router.navigate(['']);
        }
      });
  }
  async Signin() {
    const datas = this.RegisterData.value;
    this.http.post(`${this.gv.apiUrl}login`, datas, { headers: this.gv.headers }).
      subscribe((res: Response) => {
        this.log = res;
        if (this.log[0] !== undefined) {
          this.Validate();
        } else {
          this.router.navigate(['']);
        }
      });
  }
}