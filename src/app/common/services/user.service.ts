import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = environment.serverURL + '/user';
  private readonly adminUrl = environment.serverURL + '/admin/user';
  public currentUser = new BehaviorSubject<any>(null);

  constructor(
    private apiService: ApiService,
  ) { }

  getUsers(search = '', isActive = '') {
    return this.apiService.getAPI(this.adminUrl +
      '/search?textSearch=' + search);
  }

  deleteUser(id: string) {
    return this.apiService.deleteAPI(this.adminUrl +
      '?id=' + id);
  }

  updateUser(body) {
    return this.apiService.patchAPI(this.adminUrl + '/update',
      {
        isActive: body.isActive,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        id: body._id,
      });
  }

  createUser(body) {
    return this.apiService.postAPI(this.adminUrl + '/create',
      {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        passwordConfirm: body.password,

      });
  }

  getDisplayName(firstName: string, lastName: string): string {
    return (firstName || '') + ' ' + (lastName || '');
  }

  checkUser() {
    return this.apiService.getAPI(this.url + '/profile')
      .pipe(
        tap(el => {
          if (el) {
            this.currentUser.next(el);
            localStorage.setItem('userType', el.userType);
          }
        }),
      );
  }
}
