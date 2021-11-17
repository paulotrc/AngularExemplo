import {HeaderBreadCrumbV1Model} from './header-breadcrumb-v1/header-breadcrumb-v1.model';

export class HeaderV1Service {

  constructor() { }

  headerBreadCrumbModel: HeaderBreadCrumbV1Model;

  init(
    headerBreadCrumbModel: HeaderBreadCrumbV1Model
  ) {
    this.headerBreadCrumbModel = headerBreadCrumbModel;
  }

  getHeaderBreadCrumbModel(): HeaderBreadCrumbV1Model {
    return this.headerBreadCrumbModel;
  }
}
