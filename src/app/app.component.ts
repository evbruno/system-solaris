import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  //userName: Subject<string>
  //userName: string = null

  constructor(private router: Router, private loginService: LoginService) { }

  isConnected() {
    return this.loginService.isConnected()
  }

  login() {
    console.log('login')
    this.loginService.login()
    this.router.navigate(['/'])
  }

  logoff() {
    console.log('logoff')
    this.loginService.logoff()
    this.router.navigate(['/in'])
  }

  getUserName() : string {
    return this.loginService.userName
  }

}
