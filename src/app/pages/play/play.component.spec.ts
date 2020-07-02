import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayComponent } from './play.component';
import { VariablesGlobalesComponent } from 'src/app/variables-globales/variables-globales.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ScenarioComponent } from '../scenario/scenario.component';
import { AppModule } from 'src/app/app.module';


describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayComponent, ScenarioComponent ],
      providers: [VariablesGlobalesComponent],
      imports: [IonicModule.forRoot(), HttpClientModule, RouterModule, RouterTestingModule.withRoutes([
        {path: 'pages/Scenario', component: ScenarioComponent}
      ])]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
