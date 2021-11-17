import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtendimentosComponent } from './form-atendimentos.component';

describe('FormAtendimentoComponent', () => {
  let component: FormAtendimentosComponent;
  let fixture: ComponentFixture<FormAtendimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAtendimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
