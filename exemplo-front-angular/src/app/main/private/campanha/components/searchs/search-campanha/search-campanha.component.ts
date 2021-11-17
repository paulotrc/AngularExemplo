import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormBase } from '../../../../../../common/forms';
import { FormGroup } from '@angular/forms';
import { Campanha } from '../../../models/Campanha';
import { CoreUtils } from '../../../../../../../core/utils/CoreUtils';
import { Type } from '../../../../../../common/interfaces';
import { locale as portuguese } from '../../../i18n/pt-br';
import { MatDialog } from "@angular/material/dialog";
import { DetailCampanhaComponent } from "../../details/detail-campanha/detail-campanha.component";


@Component({
    selector: 'siiga-form-search-campanha',
    templateUrl: './search-campanha.component.html',
    styleUrls: ['./search-campanha.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [CoreUtils.subformComponentProviders(Campanha)]
})


export class SearchCampanhaComponent extends FormBase implements OnInit {

    impedimentos: any[] = [];
    formComponent: Type<DetailCampanhaComponent> = DetailCampanhaComponent;

    model: Campanha;

    menuActions: any[] = [
        { onClick: 'openModal', icon: 'visibility', label: 'Visualizar Permissão Manual' },
        { onClick: 'openExtraModal', icon: 'cancel', label: 'Excluir Situação Especial' },
        { onClick: 'redirect', icon: 'assignment_turned_in', label: 'Incluir Permissão Manual' }
    ];

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    constructor(public dialog: MatDialog) {
        super({});
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.model = this.model || new Campanha({});
        this.formGroup = this.createForm();

        this.coreTranslationLoaderService.loadTranslations(portuguese);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {

        return this.formBuilder.group({

        });
    }

    incluir() {
        this.router.navigate(['/campanha/form-campanha']); //  @todo Revisar: remover caso seja lixo.
    }

    pesquisar(obj: any) {
    }
}
