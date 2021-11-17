import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSituacaoEspecialComponent } from './search-situacao-especial.component';

describe('FormSearchSituacaoEspecialComponent', () => {
  let component: SearchSituacaoEspecialComponent;
  let fixture: ComponentFixture<SearchSituacaoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSituacaoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSituacaoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
