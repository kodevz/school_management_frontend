import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MychildrensRoutingModule } from './mychildrens-routing.module';
import { MychildrensComponent } from './mychildrens.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MychildrensComponent],
  imports: [
    SharedModule,
    MychildrensRoutingModule
  ]
})
export class MychildrensModule { }
