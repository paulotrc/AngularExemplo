import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCampanhaComponent } from './search-campanha.component';

describe('FormSearchCampanhaComponent', () => {
  let component: SearchCampanhaComponent;
  let fixture: ComponentFixture<SearchCampanhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCampanhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
