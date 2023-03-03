import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentDoneComponent } from './payment-done/payment-done.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';


@NgModule({
  declarations: [
    BlankComponent,
    QrPageComponent,
    PaymentDetailComponent,
    PaymentDoneComponent,
  ],
  imports: [
    CommonModule,
    BlankRoutingModule,
    QRCodeModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
    NbLayoutModule,
  ],
})
export class BlankModule { }
