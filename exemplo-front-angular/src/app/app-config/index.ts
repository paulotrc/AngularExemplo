/**
 * Default Core Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/pages/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */
import {CoreConfig} from '../../core/types';


export const coreConfig: CoreConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme      : 'theme-default',
    customScrollbars: true,
    layout          : {
        style    : 'v-layout',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'core-blue-700',
            secondaryBackground: 'core-blue-900',
            folded             : false,
            hidden             : false,
            position           : 'left',
            variant            : 'vertical-style-exemplo'
        },
        toolbar  : {
            customBackgroundColor: true,
            background           : 'core-blue-500',
            hidden               : false,
            position             : 'above-fixed'
        },
        footer   : {
            customBackgroundColor: false,
            background           : 'mat-blue-900',
            hidden               : false,
            position             : 'above-static'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    }
};
