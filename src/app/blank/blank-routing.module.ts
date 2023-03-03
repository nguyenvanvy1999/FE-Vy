import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './blank.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { PaymentDoneComponent } from './payment-done/payment-done.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'qr/:id',
        component: QrPageComponent,
      },
      {
        path: 'result/success',
        component: PaymentDoneComponent,
      },
      {
        path: ':id',
        component: PaymentDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlankRoutingModule { }
