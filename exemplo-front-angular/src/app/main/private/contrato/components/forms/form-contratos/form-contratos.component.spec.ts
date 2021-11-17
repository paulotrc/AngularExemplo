import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormContratosComponent} from './form-contratos.component';

describe('FormContratosComponent', () => {
  let component: FormContratosComponent;
  let fixture: ComponentFixture<FormContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
