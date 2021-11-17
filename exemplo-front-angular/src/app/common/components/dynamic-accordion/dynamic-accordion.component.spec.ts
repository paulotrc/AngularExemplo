import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAccordionComponent } from './dynamic-accordion.component';

describe('DynamicAccordionComponent', () => {
  let component: DynamicAccordionComponent;
  let fixture: ComponentFixture<DynamicAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
