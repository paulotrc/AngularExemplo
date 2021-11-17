import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResumosRenegociacaoPdfComponent } from './detail-resumos-renegociacao-pdf.component';

describe('DetailResumosRenegociacaoPdfComponent', () => {
  let component: DetailResumosRenegociacaoPdfComponent;
  let fixture: ComponentFixture<DetailResumosRenegociacaoPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailResumosRenegociacaoPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailResumosRenegociacaoPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
