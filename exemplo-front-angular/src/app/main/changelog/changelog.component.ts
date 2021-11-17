import {Component, OnInit} from '@angular/core';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as portuguese } from './i18n/pt-br';
import {CoreTranslationLoaderService} from '../../../core/services/translation-loader.service';

const HIERARCHY_RULES = {
    ROOT: {
        name: 'Root',
        backgroundColor: '#7EC6E1',
        getChildren: () => [
            HIERARCHY_RULES.PROJECT
        ]
    },
    PROJECT: {
        name: 'Projeto',
        color: '#fff',
        backgroundColor: '#616161',
        getChildren: () => [
            HIERARCHY_RULES.ENVIROMENT
        ]
    },
    ENVIROMENT: {
        name: 'Ambiente',
        color: '#fff',
        backgroundColor: '#989898',
        getChildren: () => [
            HIERARCHY_RULES.INSTANCE
        ]
    },
    INSTANCE: {
        name: 'Instance',
        color: '#fff',
        backgroundColor: '#C6C6C6',
        getChildren: () => [HIERARCHY_RULES.VERSION]
    },
    VERSION: {
        name: 'Version',
        color: '#fff',
        backgroundColor: '#8db9ff',
        getChildren: () => [HIERARCHY_RULES.VERSION]
    }
};



@Component({
    selector   : 'siiga-changelog',
    templateUrl: './changelog.component.html',
    styleUrls  : ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
    mindMap;

    /**
     * Constructor
     *
     * @param {CoreTranslationLoaderService} coreTranslationLoaderService
     */
    constructor(
        private coreTranslationLoaderService: CoreTranslationLoaderService
    ) {
        this.coreTranslationLoaderService.loadTranslations(english, portuguese);
    }

    ngOnInit() {
    }

    save() {

    }
}
