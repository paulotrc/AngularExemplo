import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFormEnderecosComponent } from './sub-form-enderecos.component';

describe('SubFormEnderecosComponent', () => {
  let component: SubFormEnderecosComponent;
  let fixture: ComponentFixture<SubFormEnderecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFormEnderecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFormEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
