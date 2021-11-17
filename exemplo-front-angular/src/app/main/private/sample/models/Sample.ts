import {ReportSample} from './ReportSample';

export class Sample {

    id: string;
    name: string;
    description: string;
    repository: string;
    createBy: string;
    updateBy: string;
    creationDate: string;
    updateDate: string;
    alias: string;
    status: string;
    starred: string;
    report: ReportSample;


    constructor( model) {
        this.id             = model.id;
        this.name           = model.name;
        this.description    = model.description;
        this.repository     = model.repository;
        this.createBy       = model.createBy;
        this.updateBy       = model.updateBy;
        this.creationDate   = model.creationDate;
        this.updateDate     = model.updateDate;
        this.alias          = model.alias;
        this.status         = model.status;
        this.starred        = model.starred;
        this.report         = model.report || new ReportSample({});
    }
}
