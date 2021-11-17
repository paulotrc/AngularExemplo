import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({providedIn: 'root'})
export class ComponentPageTitle {
  pTitle = '';
  pOriginalTitle = 'Angular Material UI component library';

  get title(): string { return this.pTitle; }

  set title(title: string) {
    this.pTitle = title;
    if (title !== '') {
      title = `${title} | Angular Material`;
    } else {
      title = this.pOriginalTitle;
    }
    this.bodyTitle.setTitle(title);
  }

  constructor(private bodyTitle: Title) {}
}
