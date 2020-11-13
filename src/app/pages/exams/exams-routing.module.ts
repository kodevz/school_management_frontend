import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamsComponent } from './exams.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ExamsComponent,
        data: {
          title: 'Exams'
        },
        children: [
          {
            path: '',
            redirectTo: 'manage'
          },
          {
            path: 'manage',
            component: ManageExamComponent
          },
          {
            path: 'add',
            component: AddExamComponent
          },
        ]
      },
      {
        path: 'edit/:id',
        component: AddExamComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
