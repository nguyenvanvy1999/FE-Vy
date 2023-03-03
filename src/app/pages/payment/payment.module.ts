import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MatTableModule } from '@angular/material/table';
import { QRCodeModule } from 'angularx-qrcode';
import { NbButtonModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatTableModule,
    QRCodeModule,
    NbCardModule,
    NbButtonModule,
  ],
})
export class PaymentModule { }
