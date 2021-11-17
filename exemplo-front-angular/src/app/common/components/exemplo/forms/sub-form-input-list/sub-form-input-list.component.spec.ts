import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormInputListComponent } from './sub-form-input-list.component';

describe('SubFormContratosComponent', () => {
  let component: SubFormInputListComponent;
  let fixture: ComponentFixture<SubFormInputListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFormInputListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFormInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
