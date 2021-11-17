import {Component, OnInit} from '@angular/core';
import {HeaderV1Service} from '../header-v1.service';
import {HeaderBreadCrumbV1Model} from './header-breadcrumb-v1.model';

@Component({
  selector: 'siiga-header-breadcrumb-v1',
  templateUrl: './header-breadcrumb-v1.component.html',
  styleUrls: ['./header-breadcrumb-v1.component.scss']
})
export class HeaderBreadcrumbV1Component implements OnInit {

  public headerBreadCrumbV1Model: HeaderBreadCrumbV1Model;

  constructor(private headerV1Service: HeaderV1Service) { }

  ngOnInit() {
    this.headerBreadCrumbV1Model = this.headerV1Service.getHeaderBreadCrumbModel();
    this.initializePreparedLinks();
  }

  initializePreparedLinks(): Array<string> {
    this.headerBreadCrumbV1Model.preparedLinks = new Array<string>('Serviços', 'Crédito Comercial');
    Array.prototype.push.apply(this.headerBreadCrumbV1Model.preparedLinks, this.headerBreadCrumbV1Model.links);
    return this.headerBreadCrumbV1Model.preparedLinks;
  }

}
