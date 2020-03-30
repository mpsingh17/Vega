import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.errorhandler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { LognInComponent } from './components/logn-in/logn-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    VehicleFormComponent,
    VehicleListComponent,
    LognInComponent,
    RegisterComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LognInComponent },
      { path: 'auth-callback', component: AuthCallbackComponent },
      { path: 'vehicles', component: VehicleListComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
