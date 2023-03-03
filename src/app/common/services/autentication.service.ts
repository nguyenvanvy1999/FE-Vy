import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { ApiService } from './api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public user;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private apiService: ApiService,
    private userService: UserService,
  ) {

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      try {
        this.user = JSON.parse(currentUser);
      } catch (e) {
        // console.log('Error get current user from storage', e)
      }
    }
    this.angularFireAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  updateLocalUser(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userService.checkUser().subscribe();
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
      })
      .catch((error) => {
      });
  }

  // OAuthProvider(provider) {
  //   return this.angularFireAuth.signInWithPopup(provider)
  //     .then((res) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //     }).catch((error) => {
  //       window.alert(error);
  //     });
  // }
  //
  // SigninWithGoogle() {
  //   return this.OAuthProvider(new auth.GoogleAuthProvider())
  //     .then(res => {
  //       console.log('Successfully logged in!');
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }
  //
  // SignOut() {
  //   return this.afAuth.signOut().then(() => {
  //     this.router.navigate(['login']);
  //   });
  // }

  login(
    email: string,
    password: string,
  ) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signup(
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    userType: string,
  ) {
    const url = `${environment.serverURL}/user/signup`;
    const body = {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      userType,
    };
    return this.apiService.postAPI(url, body);
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  resetAuth(): void {
    localStorage.removeItem('idToken');
    delete this.user;
  }

  logout(): void {
    localStorage.clear();

    this.user = undefined;
    this.router.navigate(['/auth/login']);

  }
}
