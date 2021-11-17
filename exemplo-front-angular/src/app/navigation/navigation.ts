import { CoreNavigation } from '../../core/types';


export const navigation: CoreNavigation[] = [
    {
        id: 'mod-situacao-especial',
        path: 'mod-situacao-especial',
        title: 'Situação Especial',
        type: 'collapsable',
        icon: 'today',
        children: [
            {
                id: 'search-situacao-especial',
                path: 'search-situacao-especial',
                title: 'Situação Especial',
                translate: 'NAV.INTERNAL_MODULES.SITUACAO_ESPECIAL.TITLE',
                type: 'item',
                icon: 'account_box',
                url: '/situacao-especial/search-situacao-especial'
            },
            // {
            //     id: 'search-permissao-manual',
            //     path: 'search-permissao-manual',
            //     title: 'Permissão manual',
            //     translate: 'NAV.INTERNAL_MODULES.PERMISSAO_MANUAL.TITLE',
            //     type: 'item',
            //     icon: 'account_box',
            //     url: '/permissao-manual/search-permissao-manual'
            // },
            // {
            //     id: 'form-permissao-manual',
            //     path: 'form-permissao-manual',
            //     title: 'Permissão manual',
            //     translate: 'NAV.INTERNAL_MODULES.FORM_PERMISSAO_MANUAL.TITLE',
            //     type: 'item',
            //     icon: 'account_box',
            //     url: '/permissao-manual/form-permissao-manual'
            // }
        ]
    }
];
