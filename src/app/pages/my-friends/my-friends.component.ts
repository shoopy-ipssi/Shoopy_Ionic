import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss'],
})
export class MyFriendsComponent implements OnInit {

  constructor(private gv: VariablesGlobales) { }

  ngOnInit() {
    this.gv.checkUserLogged()
  }

}
