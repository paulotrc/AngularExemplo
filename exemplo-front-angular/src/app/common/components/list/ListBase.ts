import {
    AfterViewInit,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {ModelsDataSource} from '../../services/ModelsDataSource';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CoreUtils} from '../../../../core/utils/CoreUtils';
import {Subject} from 'rxjs';
import {Type} from '../../interfaces';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Page} from '../pagging/Page';

export class ListBase implements OnDestroy, OnInit, AfterViewInit {

    @Output()
    onReload: EventEmitter<any> = new EventEmitter();
    @Output()
    onAllRollsSelected: EventEmitter<any> = new EventEmitter();
    @Output()
    onToggleSelectedModel: EventEmitter<any> = new EventEmitter();
    @Output()
    onSelectedChangeModels: EventEmitter<any> = new EventEmitter();
    @Output()
    onActionSelected: EventEmitter<any> = new EventEmitter();
    @Output()
    onOpenPage: EventEmitter<any> = new EventEmitter();

    @Output()
    onRedirectSelected: EventEmitter<any> = new EventEmitter();

    @Output()
    onExtraModalClicked: EventEmitter<any> = new EventEmitter();

    @Input()
    title: string;
    @Input()
    modelService: any;

    @Input()
    set dataSource(dts) {
        this.pDataSource = dts;
    }

    @Input()
    configureEvents: Function;
    @Input()
    dynamicComponent: Type<any>;
    @Input()
    dynamicColumns: any[] = [];
    @Input()
    page: Page;
    @Input()
    showToobar: true;

    @Input()
    useDefaultActions: true;

    @Input()
    id = 'id';
    @Input()
    label = 'name';

    private pMenuActions: any[] =
        [
            { onClick: 'deleteModel', icon: 'remove', label: 'Excluir' },
            { onClick: 'viewModel', icon: 'visibility', label: 'Visualizar' },
            { onClick: 'editModel', icon: 'edit', label: 'Editar' }
        ];

    get menuActions(): any[] {
        return this.pMenuActions;
    }

    @Input()
    set menuActions(value: any[]) {
        if (this.useDefaultActions) {
            this.pMenuActions.push(value);
        } else {
            this.pMenuActions = value;
        }
    }

    selectedModels: any[];


    allRowsSelected: boolean;

    hasNotifications = false;

    @ViewChild('dialogContent', { static: true })
    dialogContent: TemplateRef<any>;
    hasSelectedItens: any;
    listModels: any[];
    model: any;
    pDataSource: ModelsDataSource | null;

    checkboxes: {};
    loadingIndicator = true;
    dialogRef: MatDialogRef<any>;
    reorderable: boolean;

    // Private
    protected unsubscribeAll: Subject<any>;


    loadingState = 'default';

    rows: any[] = [];

    constructor(public matDialog: MatDialog, cd: ChangeDetectorRef) {
        this.loadingIndicator = true;
        this.reorderable = true;
        // Set the private defaults
        this.unsubscribeAll = new Subject();
        this.page = this.page || new Page({});
        this.selectedModels = [];
    }

    redirect(onClick: any, row) {
        this.onRedirectSelected.emit(row);
    }

    extraModalClicked(onClick: any, row) {
        this.onExtraModalClicked.emit(row);
    }

    testeColumn(row,prop):string {
        return row[prop];
    }

    mergeColumns(index: number, objConfigMerge: any, row: any): string {
        let strValue = '';
        objConfigMerge.separator = objConfigMerge.separator || ' ';
        if ( Array.isArray( objConfigMerge.columns ) ) {
            objConfigMerge.columns.forEach((column, indexColumn) => {
                objConfigMerge.separator = indexColumn <= (objConfigMerge.columns.length - 1 ) ? ' / ' : '';
                strValue +=  objConfigMerge.separator + '' + row[column]  + '' ;
            });
        }
        if (Array.isArray(objConfigMerge.pipe)) {
            strValue = this.applyPipes(objConfigMerge.pipe, objConfigMerge.pipe.length , strValue);
        }
        return strValue.substring(2);
    }

    applyPipes(pipeArray: any, itens: number, value): string {
        let strValue = '';
        for (let index = 0 ; index <= (itens - 1); index++ ) {
            switch (pipeArray[index]) {
                case 'status' : strValue += (value.replace('A', 'Em Atraso').replace('I', 'Inadimplente').replace('P', 'Prejuízo'));
                                break;
                case 'prazoEmDias' : strValue = (strValue !== '' ? strValue : value) + ' dias';
                                     break;
                case 'prazoEmMeses' : strValue = (strValue !== '' ? strValue : value) + ' meses';
                                      break;
            }
        }
        return strValue;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit model
     *
     * @param model
     */
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.dataSource = new ModelsDataSource( this.modelService );

        this.loadingIndicator = true;

    }

    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo) {

        this.page.pageNumber = pageInfo.offset;
        this.reload();
        /*this.serverResultsService.getResults(this.page).subscribe(pagedData => {
            this.page = pagedData.page;
            this.rows = pagedData.data;
        });*/
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            CoreUtils.closeModalOnRequestOperation(this);
            CoreUtils.onModelListChanged(this, this.id);
            CoreUtils.onSelectedModelsChanged(this, 'selectedModels');
            CoreUtils.onModelDataChanged(this);
            CoreUtils.onFilterChanged(this);
            CoreUtils.onModelDataOperation(this);
            CoreUtils.onCloseModal(this);
            CoreUtils.onReloadDataprovider(this);
            // this.setPage({ offset: 0 });
        }, 1000);
    }

    editModel(model): void {
        // @TODO deixar dinâmico
        CoreUtils.openRegisterFormInModal(this, model, this.dynamicComponent,
            'Tem certeza de que deseja cancelar a edição?',
            'samples', 'edit', 'Editar');
    }

    openModal(model): void {
        // @TODO deixar dinâmico
        CoreUtils.openRegisterFormInModal(this, model, this.dynamicComponent,
            'Tem certeza de que deseja sair dessa funcionalidade?',
            'samples', 'edit', 'Editar');
    }

    openWindow(model): void {
        // @TODO deixar dinâmico
        CoreUtils.dynamicRedirect(CoreUtils.mainComponent, this.dynamicComponent, model);
    }

    /**z
     * View model
     *
     * @param model
     */
    viewModel(model): void {
        // @TODO deixar dinâmico
        CoreUtils.openRegisterFormInModal(this, model, this.dynamicComponent,
            'Tem certeza de que deseja cancelar a edição?',
            'samples', 'view', 'Visualizar');
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    /**
     * On selected change
     *
     * @param model
     */
    onSelectedChange(model = null): void {
        console.log('onSelectedChange   ', model);
        this.selectedModels = ( model !== null ) ?  model.selected : this.selectedModels;
        if (this.selectedModels.length === 0) {
            this.allRowsSelected = false;
        }
        if(this.listModels !== undefined && this.listModels.length < this.selectedModels.length){
            this.selectedModels = [];
        }else{
            this.onSelectedChangeModels.emit( this.selectedModels );
        }
    }

    onSelectedAction(action: string, row: any): void {
        console.log('onSelectedChangeAction   ', action);
        if (this[action] === undefined) {
            this.onActionSelected.emit({ action, row });
        } else {
            this[action](row);
        }
    }

    onAllSelected($event: MatCheckboxChange) {
        this.allRowsSelected = $event.checked;
    }

    /**
     * Toggle star
     *
     * @param modelId
     */
    toggleStar(modelId): void {
        CoreUtils.toggleStar(this, modelId);
    }

    deleteModel(model: any) {
        CoreUtils.deleteConfirmation(this, model);
    }

    close() {
        CoreUtils.closeAndConfirm(this, 'Tem certeza de que deseja cancelar a edição?');
    }

    clear() {
        this.loadingState = (this.loadingState === 'default' ? 'rotated' : 'default');
        this.listModels = [];
        this.loadingIndicator = true;
    }

    updateDataProvider(page) {
        this.page = page;
    }

    public reload() {
        // this.clear();
        this.allRowsSelected = false;
        this.selectedModels = [];
        this.onSelectedChange();
        this.onReload.emit({ command: 'reload', page: this.page });
    }

    public capitalizeWords(str: string, separator = ' '){
        return CoreUtils.capitalizeWords(str, separator);
    }
}
