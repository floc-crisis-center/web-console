import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  uid: string;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.user = this.fireAuth.authState;
    this.user.subscribe(user => this.uid = (user ? user.uid : null));
   }

  googleLogin(caller: any) {
    const provider = new auth.GoogleAuthProvider();
    return this.login(provider, caller);
  }

  facebookLogin(caller: any) {
    const provider = new auth.FacebookAuthProvider();
    return this.login(provider, caller);
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
  }

  private login(provider: any, caller: any) {
    return this.fireAuth.signInWithPopup(provider)
      .then((credential) => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('Unable to sign-in:', err.message);
        caller.loading = false;
      });
  }
}
