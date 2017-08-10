import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainGridComponent } from './main-grid/main-grid.component';
import { ConfigComponent } from './config/config.component';

export const ROUTES: Routes = [
  { path: '', component: MainGridComponent },
  { path: 'in', component: LoginComponent },
  { path: 'cfg', component: ConfigComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainGridComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
