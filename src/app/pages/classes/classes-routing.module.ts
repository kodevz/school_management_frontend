import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { ManageClassComponent } from './manage-class/manage-class.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClassesComponent,
        data: {
          title: 'Classes'
        },
        children: [
          {
            path: '',
            redirectTo: 'manage'
          },
          {
            path: 'manage',
            component: ManageClassComponent
          },
          {
            path: 'create',
            component: CreateClassComponent
          }
        ]
      },
      {
        path: 'edit/:id',
        component: CreateClassComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
