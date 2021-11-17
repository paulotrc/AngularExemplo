import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[coreWidgetToggle]'
})
export class CoreWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
