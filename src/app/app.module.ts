import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { BookPageComponent } from './book/book-page/book-page.component';
import { BorrowingPageComponent } from './borrowing/borrowing-page/borrowing-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './common/service/user.service';
import {LoginPageComponent} from "./authentication/login-page/login-page.component";
import {RouterOutlet} from "@angular/router";
import {AuthGuard} from "./authentication/guard/auth.guard";
import {AuthHeaderInterceptor} from "./authentication/interceptor/auth-header/auth-header.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    UserFormComponent,
    UserListComponent,
    BookPageComponent,
    BorrowingPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
