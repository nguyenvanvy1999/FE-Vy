import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ProfitComponent } from './profit/profit.component';
import { NbCardModule, NbDatepickerModule, NbInputModule, NbLayoutModule } from "@nebular/theme";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartModule } from "angular2-chartjs";


@NgModule({
  declarations: [
    StatisticComponent,
    VehicleComponent,
    ProfitComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    ChartModule
  ]
})
export class StatisticModule { }
