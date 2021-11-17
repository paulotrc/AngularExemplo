import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit
} from '@angular/core';
import {filter, map, takeUntil} from 'rxjs/operators';
import {CoreNavigationService} from '../../navigation/navigation.service';
import {of, Subject} from 'rxjs';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from '@angular/router';
import {CoreNavigation, CoreNavigationItem} from '../../../types';
import {switchMap} from 'rxjs-compat/operator/switchMap';

@Component({
  selector: 'siiga-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BreadcrumbComponent implements OnInit {

    @Input()
    navigation: any;
    @Input()
    home = 'home';
    @Input()
    title = 'Home';
    breadcrumbList: CoreNavigation[] = [];
    private unsubscribeAll: Subject<any>;
    navigationEnd;
    TOTAL = 40;

    private filterBreadCrumbSource = new Subject<any>();
    filterBreadCrumbObservable = this.filterBreadCrumbSource.asObservable().pipe(takeUntil(this.unsubscribeAll));

  constructor(
      private coreNavigationService: CoreNavigationService,
      private router: Router
  ) {
    this.unsubscribeAll = new Subject();
    this.filterBreadCrumb = [];
 }

  ngOnInit(): void {
   this.navigation = this.navigation || this.coreNavigationService.getCurrentNavigation();
   this.mountBreadCrumbII(this.navigation);
 }

    private mountBreadCrumbII(navigation: CoreNavigation[]) {
        const routerList = this.router.url.slice(1).split('/');
        routerList.forEach((routerItemPath, index) => {
            if (navigation !== undefined) {
                const targetItem = navigation.find(page => page.path === routerItemPath);
                if (undefined !== targetItem) {
                    const arr = this.filterBreadCrumb || [];
                    const parent = this.coreNavigationService.getNavigationItemParent(targetItem.id);
                    arr.push({
                        id: targetItem.id,
                        title: targetItem?.title,
                        path: (parent !== undefined  && index > 0) ?
                            `/${parent.path}/${targetItem.path}` : `/${targetItem.path}`,
                        translate: targetItem.translate,
                        type: targetItem.type,
                        url: targetItem?.url || null,
                    });

                    this.filterBreadCrumb = arr;

                    if (index <= (routerList.length - 1)) {
                        this.mountBreadCrumbII(targetItem.children);
                    }
                }
            }
        });
    }
    get filterBreadCrumb() {
        return this.breadcrumbList;
    }
    set filterBreadCrumb(value) {
        this.breadcrumbList = value;
        this.filterBreadCrumbSource.next(value);
    }
}
