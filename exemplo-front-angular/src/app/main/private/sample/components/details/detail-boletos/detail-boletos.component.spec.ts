import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBoletosComponent } from './detail-boletos.component';

describe('detailComponent', () => {
  let component: DetailBoletosComponent;
  let fixture: ComponentFixture<DetailBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
