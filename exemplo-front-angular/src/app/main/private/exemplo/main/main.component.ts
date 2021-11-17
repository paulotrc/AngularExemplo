import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {coreAnimations} from 'core/animations';
import {CoreSidebarService} from 'core/components/sidebar/sidebar.service';
import {ModelService} from '../services/model.service';
import {FormComponent} from './form/form.component';


import {locale as navigationEnglish} from '../i18n/en';
import {locale as navigationPortuguese} from 'app/navigation/i18n/pt-br';
import {CoreTranslationLoaderService} from 'core/services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {CoreUtils} from '../../../../../core/utils/CoreUtils';
import {Type} from '../../../../common/interfaces';
import {CoreConfigService} from '../../../../../core/services/config.service';
import {MainCore} from '../../../../../core/MainCore';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector     : 'siiga-exemplo-main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : coreAnimations
})
export class MainComponent extends MainCore implements OnInit, OnDestroy {
    dialogRef: any;
    hasSelectedItens: boolean;
    searchInput: FormControl;
    formComponent: Type<FormComponent> = FormComponent;

    dynamicColumns: any[] = [
        {prop: 'titulo', name: 'Titulo'},
        {prop: 'objetivo', name: 'Objetivo'},
        {prop: 'ano', name: 'Ano'},
        {prop: 'starred', name: 'Favorito'},
        {prop: 'status', name: 'Status'},
        {prop: 'cargaHoraria', name: 'Carga horario'}
    ];

    /**
     * Constructor
     *
     * @param {ModelService} modelService
     * @param activatedRoute
     */
    constructor( public modelService: ModelService, activatedRoute: ActivatedRoute, router: Router, protected changeDetector: ChangeDetectorRef ) {
        super(modelService, activatedRoute,  router, [ navigationPortuguese ], changeDetector);

        this.coreConfigService.config = {
            layout: {
                navbar   : {
                    hidden: false
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Aqui temos um exemplo de como construir um Main "autoprovido"
        // Que tem seu prório layout, resolve e search.
        // Esse tipo de tela, geralmente é usada para carregar os demais formulários em uma modal
        CoreUtils.onCloseModal(this);
        CoreUtils.onSelectedModelsChanged(this);
        CoreUtils.closeModalOnRequestOperation(this);
        CoreUtils.onSearchInputChanged(this, [
            {name: 'ano', elementId: 'searchYear'},
            {name: 'titulo', elementId: 'searchName'}
        ]);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    newModel() {
        CoreUtils.openRegisterFormInModal( this, {}, FormComponent ,
            'Tem certeza de que deseja cancelar o cadastro?', 'Create', 'new', 'Cadastro de Exemplo');
    }
}
