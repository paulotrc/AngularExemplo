import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSamplesComponent } from './form-samples.component';

describe('FormClientesIdentificacaoComponent', () => {
  let component: FormSamplesComponent;
  let fixture: ComponentFixture<FormSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
