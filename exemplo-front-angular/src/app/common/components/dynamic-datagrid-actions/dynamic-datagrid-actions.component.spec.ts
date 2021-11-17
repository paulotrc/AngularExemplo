import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDatagridActionsComponent } from './dynamic-datagrid-actions.component';

describe('DynamicDatagridActionsComponent', () => {
  let component: DynamicDatagridActionsComponent;
  let fixture: ComponentFixture<DynamicDatagridActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDatagridActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDatagridActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
