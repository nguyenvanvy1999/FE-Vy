import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private url = environment.serverURL + '/data/chart';

  constructor(
    private apiService: ApiService,
  ) { }

  getVehicleChart(startDate: string, endDate: string) {
    return this.apiService.getAPI(this.url + '/vehicle?startDate=' + startDate + '&endDate=' + endDate);
  }

  getProfitChart(startDate: string, endDate: string) {
    return this.apiService.getAPI(this.url + '/profit?startDate=' + startDate + '&endDate=' + endDate);
  }
}
