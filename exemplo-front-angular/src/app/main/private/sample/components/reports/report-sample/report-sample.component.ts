import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBase} from '@form';
import {Sample} from '../../../models/Sample';


@Component({
    selector   : 'report-sample',
    templateUrl: './report-sample.component.html',
    styleUrls  : ['./report-sample.component.scss']
})
export class ReportSampleComponent extends FormBase implements OnInit, OnDestroy {

    model: Sample;


    ngOnInit(): void {
        this.model  = this.model || new Sample({});
        super.ngOnInit();
        this.module = 'sample';

        this.coreConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
