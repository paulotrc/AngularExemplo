export interface CoreNavigationItem
{
    id: string;
    title: string;
    path: string;
    type: 'item' | 'group' | 'collapsable';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    singlepageUrl?: string;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    function?: any;
    badge?: {
        title?: string;
        translate?: string;
        bg?: string;
        fg?: string;
    };
    children?: CoreNavigationItem[];
}

export interface CoreNavigation extends CoreNavigationItem
{
    children?: CoreNavigationItem[];
}
