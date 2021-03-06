import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { LoginComponent } from '../login/login.component';
import { APP_BASE_HREF } from '@angular/common';


describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordComponent , LoginComponent],
      providers: [VariablesGlobalesComponent, { provide: APP_BASE_HREF, useValue : '/'}],
      imports: [ IonicModule.forRoot(), ReactiveFormsModule, RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  })); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
