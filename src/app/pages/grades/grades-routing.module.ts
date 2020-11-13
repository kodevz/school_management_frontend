import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { GradesComponent } from './grades.component';
import { ManageGradeComponent } from './manage-grade/manage-grade.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GradesComponent,
        data: {
          title: 'Grades'
        },
        children: [
          {
            path: '',
            redirectTo: 'manage'
          },
          {
            path: 'manage',
            component: ManageGradeComponent
          },
          {
            path: 'add',
            component: AddGradeComponent
          },
          {
            path: 'add',
            component: AddGradeComponent
          },
        ]
      },
      {
        path: 'edit/:id',
        component: AddGradeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule { }
