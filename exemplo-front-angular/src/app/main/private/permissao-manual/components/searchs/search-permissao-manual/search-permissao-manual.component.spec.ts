import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPermissaoManualComponent } from './search-permissao-manual.component';

describe('SearchPermissaoManualComponent', () => {
  let component: SearchPermissaoManualComponent;
  let fixture: ComponentFixture<SearchPermissaoManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPermissaoManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPermissaoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
