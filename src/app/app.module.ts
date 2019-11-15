import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/servises/users.service';
import { AuthService } from './shared/servises/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
