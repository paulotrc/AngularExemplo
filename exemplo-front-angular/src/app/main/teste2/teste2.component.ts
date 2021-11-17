import { Component } from '@angular/core';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { locale as portuguese } from './i18n/pt-br';
import {CoreTranslationLoaderService} from '../../../core/services/translation-loader.service';

@Component({
    selector   : 'sample2',
    templateUrl: './teste2.component.html',
    styleUrls  : ['./teste2.component.scss']
})
export class Teste2Component
{
    /**
     * Constructor
     *
     * @param {CoreTranslationLoaderService} coreTranslationLoaderService
     */
    constructor(
        private coreTranslationLoaderService: CoreTranslationLoaderService
    )
    {
        this.coreTranslationLoaderService.loadTranslations(english, turkish, portuguese);
    }
}
