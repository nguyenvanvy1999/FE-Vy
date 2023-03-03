import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticComponent } from './statistic.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ProfitComponent } from './profit/profit.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticComponent,
    children: [
      {
        path: 'vehicle',
        component: VehicleComponent,
      },
      {
        path: 'profit',
        component: ProfitComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule { }
