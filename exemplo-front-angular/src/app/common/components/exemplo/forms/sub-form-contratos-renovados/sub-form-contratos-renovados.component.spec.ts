import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormContratosRenovadosComponent } from './sub-form-contratos-renovados.component';

describe('SubFormContratosRenovadosComponent', () => {
  let component: SubFormContratosRenovadosComponent;
  let fixture: ComponentFixture<SubFormContratosRenovadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFormContratosRenovadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFormContratosRenovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
