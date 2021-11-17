import { Component, HostBinding, Input } from '@angular/core';
import {CoreNavigationItem} from '../../../../types';


@Component({
    selector   : 'core-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class CoreNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: CoreNavigationItem;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
