import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, LoginComponent ],
      providers: [VariablesGlobalesComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]), HttpClientModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
