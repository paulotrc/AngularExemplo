import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosCadastraisComponent } from './form-dados-cadastrais.component';

describe('FormClientesIdentificacaoComponent', () => {
  let component: FormDadosCadastraisComponent;
  let fixture: ComponentFixture<FormDadosCadastraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDadosCadastraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDadosCadastraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
