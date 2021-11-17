import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector   : 'core-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class CoreConfirmDialogComponent {
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CoreConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<CoreConfirmDialogComponent>
    ) {
    }

}
