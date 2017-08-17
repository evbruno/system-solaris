import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {

  userName: any = null
  user: Observable<firebase.User>

  constructor(
    public storage: LocalStorageService,
    public afAuth: AngularFireAuth) {

    //this.userName = storage.get('user-name')
    this.user = afAuth.authState;

    this.user.subscribe(u => {
      console.log(`fb user = ${u}`)
      this.userName = u != null ? u.email : null
    })
  }

  isConnected() {
    //console.log(`isConnected this.userName  = ${this.userName}`)
    return this.userName != null
  }

  login() {
    //this.userName = "duh"
    //this.storage.set('user-name', 'duh')

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logoff() {
    this.userName = null
    this.storage.clearAll()

    this.afAuth.auth.signOut()
  }

}
