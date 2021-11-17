import { Component, HostBinding, Input } from '@angular/core';
import {CoreNavigationItem} from '../../../../types';


@Component({
    selector   : 'core-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class CoreNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: CoreNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
