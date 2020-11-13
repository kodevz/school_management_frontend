import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';
import { NotifyService } from './notify/notify.service';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { StSelectComponent } from './components/st-select/st-select.component';

const components = [
  SidebarComponent, HeaderComponent, FooterComponent, NavbarComponent, MenuListItemComponent, FormFieldErrorComponent, StSelectComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...components
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    
  ]
})
export class SharedModule { }
