import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSamplesComponent } from './search-samples.component';

describe('FormSearchSamplesComponent', () => {
  let component: SearchSamplesComponent;
  let fixture: ComponentFixture<SearchSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
