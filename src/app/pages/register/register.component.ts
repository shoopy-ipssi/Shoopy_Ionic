import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/crypto.service';
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public RegisterData: FormGroup;
  public session: Response;
  public log: Response;
  constructor (private route: Router) {
  }
  test(){
    sessionStorage.setItem('isLoggedIn', true)
    console.log(sessionStorage.getItem('isLoggedIn'))
    if (sessionStorage.getItem('isLoggedIn')){
      console.log("navigate")
      this.route.navigate(['/']);
    }
  }
  ngOnInit(){

  }
}