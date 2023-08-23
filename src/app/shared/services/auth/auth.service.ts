import {Injectable} from '@angular/core';

import {isEmpty, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {Router} from "@angular/router";
import {NotificationService} from "../notification/notification.service";
import User = firebase.User;


export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private readonly fireAuth: AngularFireAuth,
              private readonly router: Router,
              private readonly notification: NotificationService,) {
  }

  login(person: Credentials): void {
    this.fireAuth.signInWithEmailAndPassword(person.email, person.password).then(() => {
      this.notification.getSuccess('login.success', person)
      this.router.navigate(['/']);
    })
      .catch(() => {
        this.notification.getFailure('login.fail')
      });

  }

  logout() {
    return this.fireAuth.signOut().then(() => {
      this.notification.getSuccess('loginOut.success', {})
      this.router.navigate(['/']);
    })
      .catch(() => {
        this.notification.getFailure('login.fail')
      });
  }
  isLoggedIn():Observable<any>{
  return this.authState$.pipe(isEmpty())
  }
}


