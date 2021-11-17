import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfirmDialogComponent } from 'core/components/confirm-dialog/confirm-dialog.component';
import { ModelService } from '../../services/model.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit, OnDestroy {
    confirmDialogRef: MatDialogRef<CoreConfirmDialogComponent>;
    hasSelectedModels: boolean;
    isIndeterminate: boolean;
    selectedModels: string[];

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ModelsService} modelsService
     * @param {MatDialog} matDialog
     */
    constructor(
        private modelsService: ModelService,
        public matDialog: MatDialog
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.modelsService.onSelectedModelsChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectedModels => {
                this.selectedModels = selectedModels;
                setTimeout(() => {
                    this.hasSelectedModels = selectedModels.length > 0;
                    this.isIndeterminate = (selectedModels.length !== this.modelsService.listModels.length && selectedModels.length > 0);
                }, 0);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Select all
     */
    selectAll(): void {
        this.modelsService.selectModels();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this.modelsService.deselectModels();
    }

    /**
     * Delete selected models
     */
    deleteSelectedModels(): void {
        this.confirmDialogRef = this.matDialog.open(CoreConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected models?';

        this.confirmDialogRef.beforeClosed()
            .subscribe(result => {
                if ( result ) {
                    this.modelsService.deleteSelectedModels();
                }
                this.confirmDialogRef = null;
            });
    }
}
