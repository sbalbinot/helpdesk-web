import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { routes } from './routes/app.routes';
import { HomeComponent } from './routes/home/home.component';
import { AuthGuard } from './routes/security/auth.guard';
import { AuthInterceptor } from './routes/security/auth.interceptor';
import { LoginComponent } from './routes/security/login/login.component';
import { UserListComponent } from './routes/user/user-list/user-list.component';
import { UserNewComponent } from './routes/user/user-new/user-new.component';
import { DialogService } from './services/dialog.service';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    SharedService,
    UserService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
