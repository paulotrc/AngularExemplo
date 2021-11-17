import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreSharedModule } from 'core/shared.module';
import { LoginComponent } from './login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';



const routes = [
    {
        path     : '',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        CoreSharedModule,
        TranslateModule
    ]
})
export class LoginModule {
}
