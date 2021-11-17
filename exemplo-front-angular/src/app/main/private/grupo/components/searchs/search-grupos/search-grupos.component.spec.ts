import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGruposComponent } from './search-grupos.component';

describe('FormSearchGruposComponent', () => {
  let component: SearchGruposComponent;
  let fixture: ComponentFixture<SearchGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
