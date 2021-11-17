import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResumosRenegociacaoComponent } from './detail-resumos-renegociacao.component';

describe('DetailResumosRenegociacaoComponent', () => {
  let component: DetailResumosRenegociacaoComponent;
  let fixture: ComponentFixture<DetailResumosRenegociacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailResumosRenegociacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailResumosRenegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
