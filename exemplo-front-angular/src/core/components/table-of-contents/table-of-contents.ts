import {
  AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subject, fromEvent} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

interface LinkSection {
  name: string;
  links: Link[];
}

interface Link {
  /* id of the section*/
  id: string;

  /* header type h3/h4 */
  type: string;

  /* If the anchor is in view of the page */
  active: boolean;

  /* name of the anchor */
  name: string;

  /* top offset px of the anchor */
  top: number;
}

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  templateUrl: './table-of-contents.html'
})
// tslint:disable-next-line:component-class-suffix
export class TableOfContents implements OnInit, AfterViewInit, OnDestroy {
  @Input() container: string;

  pLinkSections: LinkSection[] = [];
  pLinks: Link[] = [];

  pRootUrl = this.pRouter.url.split('#')[0];
  private pScrollContainer: any;
  private pDestroyed = new Subject();
  private pUrlFragment = '';

  constructor(private pRouter: Router,
              private pRoute: ActivatedRoute,
              private pElement: ElementRef,
              @Inject(DOCUMENT) private pDocument: Document) {

    this.pRouter.events.pipe(takeUntil(this.pDestroyed)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rootUrl = pRouter.url.split('#')[0];
        if (rootUrl !== this.pRootUrl) {
          this.pRootUrl = rootUrl;
        }
      }
    });

    this.pRoute.fragment.pipe(takeUntil(this.pDestroyed)).subscribe(fragment => {
      this.pUrlFragment = fragment;

      const target = document.getElementById(this.pUrlFragment);
      if (target) {
        target.scrollIntoView();
      }
    });
  }

  ngOnInit(): void {
    // On init, the sidenav content element doesn't yet exist, so it's not possible
    // to subscribe to its scroll event until next tick (when it does exist).
    Promise.resolve().then(() => {
      this.pScrollContainer = this.container ?
        this.pDocument.querySelectorAll(this.container)[0] : window;

      if (this.pScrollContainer) {
        fromEvent(this.pScrollContainer, 'scroll').pipe(
            takeUntil(this.pDestroyed),
            debounceTime(10))
            .subscribe(() => this.onScroll());
      }
    });
  }

  ngAfterViewInit() {
    this.updateScrollPosition();
  }

  ngOnDestroy(): void {
    this.pDestroyed.next();
  }

  updateScrollPosition(): void {
    const target = document.getElementById(this.pUrlFragment);
    if (target) {
      target.scrollIntoView();
    }
  }

  resetHeaders() {
    this.pLinkSections = [];
    this.pLinks = [];
  }

  addHeaders(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {
    const headers = Array.from<HTMLHeadingElement>(docViewerContent.querySelectorAll('h3, h4'));
    const links: Link[] = [];
    headers.forEach((header) => {
      // remove the 'link' icon name from the inner text
      const name = header.innerText.trim().replace(/^link/, '');
      const {top} = header.getBoundingClientRect();
      links.push({
        name,
        type: header.tagName.toLowerCase(),
        top,
        id: header.id,
        active: false
      });
    });
    this.pLinkSections[sectionIndex] = {name: sectionName, links};
    this.pLinks.push(...links);
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number | void {
    const {top} = this.pElement.nativeElement.getBoundingClientRect();
    if (typeof this.pScrollContainer.scrollTop !== 'undefined') {
      return this.pScrollContainer.scrollTop + top;
    } else if (typeof this.pScrollContainer.pageYOffset !== 'undefined') {
      return this.pScrollContainer.pageYOffset + top;
    }
  }

  private onScroll(): void {
    for (let i = 0; i < this.pLinks.length; i++) {
      this.pLinks[i].active = this.isLinkActive(this.pLinks[i], this.pLinks[i + 1]);
    }
  }

  private isLinkActive(currentLink: any, nextLink: any): boolean {
    // A link is considered active if the page is scrolled passed the anchor without also
    // being scrolled passed the next link
    const scrollOffset = this.getScrollOffset();
    return scrollOffset >= currentLink.top && !(nextLink && nextLink.top < scrollOffset);
  }

}
