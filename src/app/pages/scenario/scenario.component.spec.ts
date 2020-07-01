import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScenarioComponent } from './scenario.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [VariablesGlobalesComponent], 
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes([]), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
