import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxSelectBoxModule, DxButtonModule, DxTabPanelModule, DxDataGridModule  } from 'devextreme-angular';
import { HttpClientModule} from '@angular/common/http';
import { StorageService } from './shared/services/storage.service';
import { Service } from './pages/proyeccionCostos/proyeccionCostos.service'


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxSelectBoxModule,
    DxButtonModule ,
    DxTabPanelModule,
    HttpClientModule
  ],
  providers: [AuthService, ScreenService, AppInfoService,StorageService, Service],
  bootstrap: [AppComponent]
})
export class AppModule { }