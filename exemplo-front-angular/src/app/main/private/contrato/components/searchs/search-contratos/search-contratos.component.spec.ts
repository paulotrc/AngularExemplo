import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContratosComponent } from './search-contratos.component';

describe('FormSearchContratosComponent', () => {
    let component: SearchContratosComponent;
    let fixture: ComponentFixture<SearchContratosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [SearchContratosComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchContratosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});