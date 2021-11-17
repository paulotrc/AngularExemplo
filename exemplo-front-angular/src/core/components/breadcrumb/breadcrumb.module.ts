import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
    declarations: [BreadcrumbComponent],
    exports: [
        BreadcrumbComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class BreadcrumbModule { }
