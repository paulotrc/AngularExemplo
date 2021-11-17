import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-item-renderer-accordion',
  templateUrl: './item-renderer-accordion.component.html',
  styleUrls: ['./item-renderer-accordion.component.scss']
})
export class ItemRendererAccordionComponent<M> implements OnInit {

  @Input() action: string;
  @Input() model: M;
  @ViewChild(MatAccordion, {static: false}) accordion: MatAccordion;

  constructor() { }

  ngOnInit() {
  }

}
