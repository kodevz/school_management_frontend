import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    ContentPagesRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ErrorComponent
  ],
})
export class ContentPagesModule { }
