import { Component, OnInit } from '@angular/core';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss'],
})
export class MyFriendsComponent implements OnInit {

  constructor(private gv: VariablesGlobalesComponent) { }

  ngOnInit() {
    this.gv.checkUserLogged()
  }

}
