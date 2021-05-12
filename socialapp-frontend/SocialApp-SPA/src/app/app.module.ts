import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TitleCasePipe } from "@angular/common";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { FileUploadModule } from "ng2-file-upload";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimeagoModule } from "ngx-timeago";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./_services/auth.service";
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from "./_services/error.interceptor.service";
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from "./routes";
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from "./_resolvers/member_edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: ['localhost:5000'],
        // blacklistedRoutes: ['localhost:5000/api/auth']
        whitelistedDomains: ['192.168.60.52:5555'],
        blacklistedRoutes: ['http://192.168.60.52:5555/social-api/api/auth']
      }
    }),
    TabsModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    TitleCasePipe,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
