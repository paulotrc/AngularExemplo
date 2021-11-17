import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[siigaControlErrorContainerDirective]'
})
export class ControlErrorContainerDirective {

  constructor(public vcr: ViewContainerRef) { }

}
