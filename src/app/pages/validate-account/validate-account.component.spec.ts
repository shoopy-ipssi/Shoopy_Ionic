import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidateAccountComponent } from './validate-account.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { APP_BASE_HREF } from '@angular/common';

describe('ValidateAccountComponent', () => {
  let component: ValidateAccountComponent;
  let fixture: ComponentFixture<ValidateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateAccountComponent ],
      providers: [VariablesGlobalesComponent],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
