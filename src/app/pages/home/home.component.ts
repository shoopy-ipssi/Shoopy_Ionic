import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { VariablesGlobales } from 'src/app/variables-globales/variables-globales.component';

const test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(private gv: VariablesGlobales) { }

  typeTextAnimated(sentence) {
    var ele = '<span>' + sentence.split('').join('</span><span>') + '</span>';
    
    
    $(ele).hide().appendTo('#block_att').each(function (i) {
        $(this).delay(50 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100);
    });
    }

  ngOnInit() {
    this.gv.checkUserLogged()
    this.typeTextAnimated(test)
  }

}