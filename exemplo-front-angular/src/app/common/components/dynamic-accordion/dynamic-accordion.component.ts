import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Type} from '../../interfaces/type';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'dynamic-accordion',
  templateUrl: './dynamic-accordion.component.html',
  styleUrls: ['./dynamic-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicAccordionComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() action: string;
  @Input() model: any = {};
  @Input() headerComponent: Type<any>;
  @Input() rowComponent: any;
  @Input() rowModel: string;
  @Input() opened: boolean;
  @Input() openChildren = false;
  @ViewChild('loadComponentHeader', { read: ViewContainerRef }) entryHeader: ViewContainerRef;
  @ViewChild('loadComponentRow', { read: ViewContainerRef }) entryRow: ViewContainerRef;

  @ViewChild(MatAccordion, {static: false}) accordion: MatAccordion;

  componentHeaderRef: any;
  componentRowRef: any;
  constructor(private resolverHeader: ComponentFactoryResolver, private resolverRow: ComponentFactoryResolver) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.opened === true) {
        this.accordion.openAll();
      }
      if (null !== this.headerComponent) {
        this.loadHeader(this.headerComponent, null, this.model);
      }

      if (null !== this.rowComponent) {
        this.loadRow(this.rowComponent, null, this.model);
      }
    });
  }


  openComponent = <M>(factory: ComponentFactory<any>, entry: ViewContainerRef, componentRef, action: string = null, model: M = null) => {
    entry.clear();
    componentRef = entry.createComponent(factory);
    componentRef.instance.action = action || 'new';
    componentRef.instance.model = model;
  }

  loadHeader = <T, M>(component: Type<T>, action: string = '', model: M = null): void => {
    let factory: ComponentFactory<T>;
    factory = this.resolverHeader.resolveComponentFactory(component);
    this.openComponent(factory, this.entryHeader, this.componentHeaderRef, null, this.model);
  }

  loadRow = <T, M>(component: Type<T>, action: string = '', model: M = null): void => {
    let factory: ComponentFactory<any>;
    factory = this.resolverRow.resolveComponentFactory(component);
    this.openComponent(factory, this.entryRow,  this.componentRowRef, null, null !== this.model ? ((this.rowModel !== undefined) ? this.model[this.rowModel] : this.model)  : null);
  }

  destroyComponents() {
    this.componentHeaderRef.destroy();
    this.componentRowRef.destroy();
  }

}
