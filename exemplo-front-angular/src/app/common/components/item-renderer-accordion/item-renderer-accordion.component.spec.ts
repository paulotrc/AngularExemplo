import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRendererAccordionComponent } from './item-renderer-accordion.component';

describe('ItemRendererAccordionComponent', () => {
  let component: ItemRendererAccordionComponent;
  let fixture: ComponentFixture<ItemRendererAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRendererAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRendererAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
