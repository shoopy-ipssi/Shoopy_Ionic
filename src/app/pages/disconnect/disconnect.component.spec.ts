import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisconnectComponent } from './disconnect.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { AppModule } from 'src/app/app.module';


describe('DisconnectComponent', () => {
  let component: DisconnectComponent;
  let fixture: ComponentFixture<DisconnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectComponent ],
      providers: [VariablesGlobalesComponent],
      imports: [AppModule, IonicModule.forRoot(), RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DisconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
