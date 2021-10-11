import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';
import { environment, ls_name } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem(ls_name.TOKEN);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.api],
        disallowedRoutes: ['']
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
