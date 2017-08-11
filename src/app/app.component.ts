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
  userName: string = null

  constructor(private router: Router) { }

  isConnected() {
    return this.userName != null
  }

  login() {
    console.log('login')
    this.userName = "duh"
    this.router.navigate(['/'])
  }

  logoff() {
    console.log('logoff')
    this.userName = null
    this.router.navigate(['/in'])
  }

}
