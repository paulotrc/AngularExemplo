import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientesComponent } from
    "app/main/private/cliente/components/details/detail-clientes/detail-clientes.component";

describe('DetailClientesComponent', () => {
    let component: DetailClientesComponent;
    let fixture: ComponentFixture<DetailClientesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailClientesComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailClientesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});