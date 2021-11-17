import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSituacaoEspecialComponent } from './detail-situacao-especial.component';

describe('DetailSituacaoEspecialComponent', () => {
  let component: DetailSituacaoEspecialComponent;
  let fixture: ComponentFixture<DetailSituacaoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSituacaoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSituacaoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
