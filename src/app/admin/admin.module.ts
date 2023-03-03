import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class AdminModule { }
