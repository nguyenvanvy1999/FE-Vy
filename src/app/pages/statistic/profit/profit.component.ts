import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartService } from '../../../common/services/chart.service';
import * as dayjs from 'dayjs';
import { NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss'],
})
export class ProfitComponent implements OnInit {
  filterForm: FormGroup;
  data: any;
  options: any;

  constructor(
    private chartService: ChartService,
  ) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
        timeStart: new FormControl(null),
        timeEnd: new FormControl(null),
      },
    );

    this.data = {
    };

    this.options = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        labels: {
          fontColor: '#3366FF',
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: '#3366FF',
            },
            ticks: {
              fontColor: '#3366FF',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: '#3366FF',
            },
            ticks: {
              fontColor: '#3366FF',
            },
          },
        ],
      },
    };

    this.filterForm.valueChanges.subscribe(res => {
      if (res && res.timeStart && res.timeEnd) {
        this.chartService.getProfitChart(
          dayjs(res.timeStart).add(1, 'day').toISOString(),
          dayjs(res.timeEnd).add(1, 'day').toISOString(),
        )
          .subscribe(rs => {
            this.data = {
              labels: rs.map(el => dayjs(el.day).format('YYYY-MM-DD')),
              datasets: [{
                data: rs.map(el => el.profit),
                label: 'Profit',
                backgroundColor: NbColorHelper.hexToRgbA('#3366FF', 0.8),
              }],
            };
          });
      }
    });
  }

}
