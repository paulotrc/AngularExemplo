import {Component, Input, OnInit} from '@angular/core';
import {HeaderBreadCrumbV1Model} from './header-breadcrumb-v1/header-breadcrumb-v1.model';
import {HeaderV1Service} from './header-v1.service';

@Component({
  selector: 'siiga-header-v1',
  templateUrl: './header-v1.component.html',
  styleUrls: ['./header-v1.component.scss']
})
export class HeaderV1Component implements OnInit {

  @Input()
  breadCrumbLinks: Array<string>;

  @Input()
  cnpjCliente: string;

  @Input()
  nomeCliente: string;

  @Input()
  numeroSolicitacao: string;

  @Input()
  showHeaderBreadCrumb: boolean;

  @Input()
  showHeaderAction: boolean;

  @Input()
  showHeader: boolean;

  @Input()
  solicitarDocumento = true;

  @Input()
  quadroComunicacao = true;

  constructor(private headerV1Service: HeaderV1Service) { }

  ngOnInit() {
    this.initFields();

    const headerBreadCrumbV1Model: HeaderBreadCrumbV1Model = this.initHeaderBreadCrumbModel();

    this.headerV1Service.init(headerBreadCrumbV1Model);
  }

  initFields(): void {

    if (!this.breadCrumbLinks) {
      this.breadCrumbLinks = new Array<string>();
    }

    if (!this.showHeaderBreadCrumb) {
      this.showHeaderBreadCrumb = true;
    }

    if (!this.showHeaderAction) {
      this.showHeaderAction = true;
    }

    if (!this.showHeader) {
      this.showHeader = true;
    }

  }

  initHeaderBreadCrumbModel(): HeaderBreadCrumbV1Model {
    const headerBreadCrumbV1Model: HeaderBreadCrumbV1Model = new HeaderBreadCrumbV1Model();
    headerBreadCrumbV1Model.links = this.breadCrumbLinks;
    headerBreadCrumbV1Model.show = this.showHeaderBreadCrumb;
    return headerBreadCrumbV1Model;
  }

}
