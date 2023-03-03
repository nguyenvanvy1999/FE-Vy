import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InOutListComponent } from './in-out-list.component';
import { InOutDetailComponent } from './in-out-detail/in-out-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InOutListComponent,
      },
      {
        path: ':id',
        component: InOutDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InOutListRoutingModule {
}

