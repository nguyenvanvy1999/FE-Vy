import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoorService {
  private readonly url = environment.serverURL + '/door';

  constructor(
    private apiService: ApiService,
  ) { }

  doorStatus(door: string) {
    return this.apiService.getAPINoPluck(this.url + '/door-status?door=' + door);
  }

  controlDoor(door: string, status: string) {
    return this.apiService.postAPI(this.url + '/control-door', {
      door,
      status,
    });
  }
}
