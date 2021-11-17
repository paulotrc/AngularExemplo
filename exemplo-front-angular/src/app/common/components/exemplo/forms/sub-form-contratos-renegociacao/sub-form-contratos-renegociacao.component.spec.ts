import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormContratosRenegociacaoComponent } from './sub-form-contratos-renegociacao.component';

describe('SubFormEnderecosComponent', () => {
  let component: SubFormContratosRenegociacaoComponent;
  let fixture: ComponentFixture<SubFormContratosRenegociacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFormContratosRenegociacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFormContratosRenegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
