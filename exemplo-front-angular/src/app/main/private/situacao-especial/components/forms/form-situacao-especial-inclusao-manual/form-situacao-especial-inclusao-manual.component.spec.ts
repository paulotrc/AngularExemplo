import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSituacaoEspecialInclusaoManualComponent } from './form-situacao-especial-inclusao-manual.component';

describe('FormSituacaoEspecialInclusaoManualComponent', () => {
  let component: FormSituacaoEspecialInclusaoManualComponent;
  let fixture: ComponentFixture<FormSituacaoEspecialInclusaoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSituacaoEspecialInclusaoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSituacaoEspecialInclusaoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
