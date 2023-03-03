import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = environment.serverURL + '/data';
  constructor(
    private apiService: ApiService,
  ) { }

  getListData(search = '', status = '', dateType = 'in', timeStart = '', timeEnd = '') {
    return this.apiService.getAPI<any[]>(this.url + '/search' + `?search=${search}&status=${status}&dateType=${dateType}&timeStart=${timeStart}&timeEnd=${timeEnd}`);
  }

  getListDataPayment(search = '', status = '', dateType = 'in', timeStart = '', timeEnd = '', isPayment = true) {
    return this.apiService.getAPI<any[]>(this.url + '/search' + `?search=${search}&status=${status}&dateType=${dateType}&timeStart=${timeStart}&timeEnd=${timeEnd}&isPayment=${isPayment}`);
  }

  getDetailData(id: string) {
    return this.apiService.getAPI<any[]>(this.url + `/${id}`);
  }

  postPayment(id: string) {
    return this.apiService.postAPI(this.url + '/payment', {id});
  }
}
