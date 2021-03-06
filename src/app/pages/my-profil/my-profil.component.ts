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
  public user: any;
  ProfilData: FormGroup;
  log: Response;
  id: string;
                     
  
  constructor(private http: HttpClient, public fb: FormBuilder, private router: Router, 
    private route: ActivatedRoute, private gv: VariablesGlobalesComponent) { 
    }


  ngOnInit() {
    this.id = sessionStorage.getItem('UID');
   
    const data = { params: {userID: sessionStorage.getItem('UID')}}
    return this.http.get(this.gv.apiUrl+'user', data).subscribe((results: Response) => {
      this.user = results;
      this.ProfilData = this.fb.group({
        id_shoopy: [this.user.id_shoopy, Validators.required],
      });;
    })
  };
  async UpdateProfil() {
    const datas = this.ProfilData.value;
    this.http.put(`${this.gv.apiUrl}updateuser/${this.id}`, datas, { headers: this.gv.headers }).
      subscribe((res: Response) => {
        this.log = res;
        this.router.navigate(['']);
      });
  }
}
