import {InjectionToken, Type} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

export interface IProviders {
    provide: InjectionToken<ControlValueAccessor>;
    useExisting: Type<any>;
    multi?: boolean;
}
