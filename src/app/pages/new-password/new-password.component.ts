import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { HttpClient } from '@angular/common/http';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  public decryptU
  public username
  public NpData: FormGroup
  public checkPasswordState=true
  constructor(private route: Router, private router: ActivatedRoute, public EncrDecr: EncrDecrService, 
    public http: HttpClient, public gv: VariablesGlobalesComponent, public fb: FormBuilder) { }

  checkUser(){
    const data = {params: {userID: this.decryptU, username: "123456$#@$^@1ERF"}}
    this.http.get(`${this.gv.apiUrl}user`, data).subscribe(result => {
      if (result == undefined){
        this.route.navigate(['/login'])
      } else {
        this.username = result[0].username
      }
    })
  }
  sendNewPassword(){
    const data = this.NpData.value
    if (data.password === data.checkPassword){
      this.checkPasswordState = true
      let sendData = {password: this.EncrDecr.set(this.gv.cryptVal, data.password)}
      this.http.put(`${this.gv.apiUrl}updateuser/${this.decryptU}`, sendData, {headers: this.gv.headers}).subscribe(result => {
        if (result) {
          this.route.navigate(['/login'])
        }
      })
    }
    else {
      this.checkPasswordState = false
    }
  }
  ngOnInit() {
    this.NpData = this.fb.group({
      password: ['', Validators.required],
      checkPassword: ['', Validators.required]
    })
    //this.decryptU = this.router.snapshot.paramMap.get('u').split('-_-').join('=').split('__').join('/');
    const u = this.router.snapshot.paramMap.get('u')
    if (u != undefined){
      console.log('ok')
      this.decryptU = this.EncrDecr.get('123456$#@$^@1ERF', u.split('-_-').join('=').split('__').join('/'))
      this.checkUser()
    } else {
      this.route.navigate(['/login'])
    }
  }

}
