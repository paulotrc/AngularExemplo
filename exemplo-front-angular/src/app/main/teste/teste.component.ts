import {Component, OnInit} from '@angular/core';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as portuguese } from './i18n/pt-br';
import {CoreTranslationLoaderService} from '../../../core/services/translation-loader.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

export interface ListGroups {
    letter: string;
    names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};




@Component({
    selector   : 'sample',
    templateUrl: './teste.component.html',
    styleUrls  : ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
    showFiller = false;


    listForm: FormGroup = this.formBuilder.group({
        listGroup: '',
    });

    listGroups: ListGroups[] = [{
        letter: 'A',
        names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
    }, {
        letter: 'C',
        names: ['California', 'Colorado', 'Connecticut']
    }, {
        letter: 'D',
        names: ['Delaware']
    }, {
        letter: 'F',
        names: ['Florida']
    }, {
        letter: 'G',
        names: ['Georgia']
    }, {
        letter: 'H',
        names: ['Hawaii']
    }, {
        letter: 'I',
        names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
    }, {
        letter: 'K',
        names: ['Kansas', 'Kentucky']
    }, {
        letter: 'L',
        names: ['Louisiana']
    }, {
        letter: 'M',
        names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
            'Minnesota', 'Mississippi', 'Missouri', 'Montana']
    }, {
        letter: 'N',
        names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
            'New Mexico', 'New York', 'North Carolina', 'North Dakota']
    }, {
        letter: 'O',
        names: ['Ohio', 'Oklahoma', 'Oregon']
    }, {
        letter: 'P',
        names: ['Pennsylvania']
    }, {
        letter: 'R',
        names: ['Rhode Island']
    }, {
        letter: 'S',
        names: ['South Carolina', 'South Dakota']
    }, {
        letter: 'T',
        names: ['Tennessee', 'Texas']
    }, {
        letter: 'U',
        names: ['Utah']
    }, {
        letter: 'V',
        names: ['Vermont', 'Virginia']
    }, {
        letter: 'W',
        names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }];

    /**
     * Constructor
     *
     * @param {CoreTranslationLoaderService} coreTranslationLoaderService
     */
    constructor(
        private translationLoaderService: CoreTranslationLoaderService,
        private formBuilder: FormBuilder
    ) {
        this.translationLoaderService.loadTranslations(english, turkish, portuguese);
    }

    ngOnInit() {

    }
}
