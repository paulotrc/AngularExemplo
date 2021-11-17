import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import {Error} from 'tslint/lib/error';
import {CORE_CONFIG} from './services/config.service';

@NgModule()
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if ( parentModule ) {
            throw new Error('O CoreModule já foi carregado e só deve ser importado no AppModule apenas!');
        }
    }

    static forRoot(config): ModuleWithProviders {
        return {
            ngModule : CoreModule,
            providers: [
                {
                    provide : CORE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
