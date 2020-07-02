import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyFriendsComponent } from './my-friends.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { AppModule } from 'src/app/app.module';


describe('MyFriendsComponent', () => {
  let component: MyFriendsComponent;
  let fixture: ComponentFixture<MyFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, LoginComponent],
      providers: [VariablesGlobalesComponent],
      imports: [AppModule,IonicModule.forRoot(), RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MyFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
