import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSituacaoEspecialComponent } from './form-situacao-especial.component';

describe('FormSituacaoEspecialComponent', () => {
  let component: FormSituacaoEspecialComponent;
  let fixture: ComponentFixture<FormSituacaoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSituacaoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSituacaoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
