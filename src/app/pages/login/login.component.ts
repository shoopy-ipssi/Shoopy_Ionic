import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EncrDecrService } from '../../services/crypto.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public LoginData: FormGroup;
  public session: Response;
  public log: Response;

  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router, public EncrDecr: EncrDecrService) {
    this.LoginData = this.fb.group({
      email: ['', Validators.required], // la chaîne de caractères est la valeur par défaut du champ
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async Validate() {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (this.LoginData.value.email.match(emailRegex)) {
      const decrypted = this.EncrDecr.set('@$^FNARD@75017', this.LoginData.value.password);
      if (decrypted == this.log[0].password) {
        const email = sessionStorage.setItem('email', this.log[0].email);
        const role = sessionStorage.setItem('role', this.log[0].role);
      } else {
        alert('Mot de passe incorrect')
      }
    } else {
      alert('Email incorrect')
    }
    this.router.navigate(['/home']);
  }

  async Signin() {
    const datas = this.LoginData.value;
    this.http.post('https://impapi.herokuapp.com/api/login', datas, { headers: headers }).
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
