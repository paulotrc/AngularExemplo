import { NgModule } from '@angular/core';

import { CoreConfirmDialogComponent } from './confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        CoreConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        CoreConfirmDialogComponent
    ],
})
export class CoreConfirmDialogModule {
}
