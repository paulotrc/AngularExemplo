import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCampanhaComponent } from './form-campanha.component';

describe('FormCampanhaComponent', () => {
  let component: FormCampanhaComponent;
  let fixture: ComponentFixture<FormCampanhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCampanhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
