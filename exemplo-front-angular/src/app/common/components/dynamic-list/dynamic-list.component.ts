import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

import {coreAnimations} from 'core/animations';
import {ListBase} from '../list/ListBase';


@Component({
    selector     : 'dynamic-list',
    templateUrl  : './dynamic-list.component.html',
    styleUrls    : ['./dynamic-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : coreAnimations
})
export class DynamicListComponent extends ListBase {
    @Input()
    debug: boolean;



}



