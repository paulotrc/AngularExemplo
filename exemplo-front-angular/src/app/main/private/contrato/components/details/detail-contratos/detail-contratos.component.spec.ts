import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContratosComponent } from
    'app/main/private/contrato/components/details/detail-contratos/detail-contratos.component';

describe('DetailContratosComponent', () => {
    let component: DetailContratosComponent;
    let fixture: ComponentFixture<DetailContratosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailContratosComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailContratosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
