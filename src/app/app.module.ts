import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LocalStorageModule } from 'angular-2-local-storage';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainGridComponent } from './main-grid/main-grid.component';
import { ConfigComponent } from './config/config.component';

import { LoginService } from './login.service';
import { ServiceAPIStrategy, MemoryAPI, FirebaseAPI } from './service-api.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { TagsComponent } from './config/tags/tags.component';

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
    ConfigComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
  ],
  providers: [
    LoginService,
    ServiceAPIStrategy,
    MemoryAPI,
    FirebaseAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
