import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ProfileComponent } from './components/profile/profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatSliderModule} from '@angular/material';

import { AuthService } from './services/auth.service';
import {EnsureAuthenticatedService} from './services/ensure-authenticated.service';
import {LoginRedirectService} from './services/login-redirect.service';

import { Http, Headers, HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { RoomDataService } from './services/room-data.service';
import { ProfileDataService } from './services/profile-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RoomsComponent,
    LandingComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '',
        redirectTo: 'landing',
        pathMatch: 'full', },
      { path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirectService]},
      { path: 'register',
        component: RegisterComponent,
        canActivate: [LoginRedirectService] },
      { path: 'home',
        component: HomeComponent,
    canActivate: [EnsureAuthenticatedService] },
      { path: 'rooms',
        component: RoomsComponent,
    canActivate: [EnsureAuthenticatedService]},
      {
        path: 'profile',
        component: ProfileComponent,
      canActivate: [EnsureAuthenticatedService]},
      { path: '**',
        component: LandingComponent }
    ])
  ],
  providers: [AuthService, EnsureAuthenticatedService, LoginRedirectService, RoomDataService, ProfileDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
