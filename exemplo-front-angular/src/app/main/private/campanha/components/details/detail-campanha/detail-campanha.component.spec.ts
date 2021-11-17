import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCampanhaComponent } from './detail-campanha.component';

describe('DetailCampanhaComponent', () => {
  let component: DetailCampanhaComponent;
  let fixture: ComponentFixture<DetailCampanhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCampanhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
