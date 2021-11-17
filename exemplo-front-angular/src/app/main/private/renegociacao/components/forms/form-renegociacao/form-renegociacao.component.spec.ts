import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRenegociacaoComponent } from './form-renegociacao.component';

describe('FormRenegociacaoComponent', () => {
  let component: FormRenegociacaoComponent;
  let fixture: ComponentFixture<FormRenegociacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRenegociacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRenegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
