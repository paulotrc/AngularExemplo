import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGruposComponent } from './form-grupos.component';

describe('FormClientesIdentificacaoComponent', () => {
  let component: FormGruposComponent;
  let fixture: ComponentFixture<FormGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
