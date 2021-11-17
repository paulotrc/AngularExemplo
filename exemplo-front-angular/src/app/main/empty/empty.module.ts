import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmptyRouteComponent } from './empty-route.component';

const routes = [
  {
    path     : '',
    component: EmptyRouteComponent
  }
];

@NgModule({
  declarations: [
    EmptyRouteComponent
  ],
  imports     : [
    RouterModule.forChild(routes)
  ],
  exports     : [
    EmptyRouteComponent
  ]
})

export class EmptyModule
{
}
