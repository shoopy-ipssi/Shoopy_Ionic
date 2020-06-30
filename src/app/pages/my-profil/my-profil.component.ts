import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss'],
})
export class MyProfilComponent implements OnInit {
  user: any;
  ProfilData: FormGroup;
  log: Response;
  id: string;

  constructor(private http: HttpClient, public fb: FormBuilder, private router: Router, 
    private route: ActivatedRoute, private gv: VariablesGlobalesComponent) { }


  ngOnInit() {
    this.ProfilData = this.fb.group({
      email: ['', Validators.required], // la chaîne de caractères est la valeur par défaut du champ
      password: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      username: ['', Validators.required]
    });
    const data = { params: {userID: sessionStorage.getItem('UID')}}
      return this.http.get(this.gv.apiUrl+'user', data).subscribe((results: Response) => {
        this.user = results[0];
      })
  }
  async UpdateProfil() {
    this.id = localStorage.getItem('UID');
    const datas = this.ProfilData.value;
    this.http.post(`${this.gv.apiUrl}updateuser/${this.id}`, datas, { headers: this.gv.headers }).
      subscribe((res: Response) => {
        this.log = res;
        console.log(res)
      });
  }
}
