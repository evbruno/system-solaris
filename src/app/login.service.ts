import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LoginService {

  userName: any = null

  constructor(private storage: LocalStorageService) {
    this.userName = storage.get('user-name')
  }

  isConnected() {
    console.log(`isConnected this.userName  = ${this.userName}`)
    return this.userName != null
  }

  login() {
    this.userName = "duh"
    this.storage.set('user-name', 'duh')
  }

  logoff() {
    this.userName = null
    this.storage.clearAll()
  }

}
