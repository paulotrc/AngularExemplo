import {Injector} from '@angular/core';

export class CoreAppInjector {

    private static injector: Injector;

    static setInjector(injector: Injector) {
        CoreAppInjector.injector = injector;
    }

    static getInjector(): Injector {
        return CoreAppInjector.injector;
    }
}
