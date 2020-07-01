import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VariablesGlobalesComponent } from './variables-globales.component';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';

describe('VariablesGlobalesComponent', () => {
  let component: VariablesGlobalesComponent;
  let fixture: ComponentFixture<VariablesGlobalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablesGlobalesComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(
        []
      ), HttpClientModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VariablesGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
