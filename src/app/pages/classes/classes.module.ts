import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CreateClassComponent } from './create-class/create-class.component';
import { ManageClassComponent } from './manage-class/manage-class.component';


@NgModule({
  declarations: [ClassesComponent, CreateClassComponent, ManageClassComponent],
  imports: [
    SharedModule,
    ClassesRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ClassesModule { }
