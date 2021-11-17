import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPermissaoManualComponent } from './form-permissao-manual.component';

describe('FormPermissaoManualComponent', () => {
  let component: FormPermissaoManualComponent;
  let fixture: ComponentFixture<FormPermissaoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPermissaoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPermissaoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
