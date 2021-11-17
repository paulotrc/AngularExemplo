import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSituacaoEspecialComponent } from './delete-situacao-especial.component';

describe('DeleteSituacaoEspecialComponent', () => {
  let component: DeleteSituacaoEspecialComponent;
  let fixture: ComponentFixture<DeleteSituacaoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSituacaoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSituacaoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
