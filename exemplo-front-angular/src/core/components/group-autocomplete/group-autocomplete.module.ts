import {NgModule} from '@angular/core';
import {GroupAutocompleteComponent} from './group-autocomplete.component';
import {TranslateModule} from '@ngx-translate/core';
import {CoreSharedModule} from '../../shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        GroupAutocompleteComponent
    ],
    imports: [
        TranslateModule,
        CoreSharedModule,

        MatAutocompleteModule,
        MatInputModule
    ],
    exports: [
        GroupAutocompleteComponent
    ],
})
export class CoreGroupAutocompleteModule {
}
