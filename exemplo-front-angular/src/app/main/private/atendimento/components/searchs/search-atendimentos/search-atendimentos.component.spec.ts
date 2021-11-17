import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAtendimentosComponent } from './search-atendimentos.component';

describe('FormSearchAtendimentosComponent', () => {
  let component: SearchAtendimentosComponent;
  let fixture: ComponentFixture<SearchAtendimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAtendimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
