import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { ManageSubjectComponent } from './manage-subject/manage-subject.component';
import { SubjectsComponent } from './subjects.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SubjectsComponent,
        data: {
          title: 'Subjects'
        },
        children: [
          {
            path: '',
            redirectTo: 'manage'
          },
          {
            path: 'manage',
            component: ManageSubjectComponent
          },
          {
            path: 'create',
            component: CreateSubjectComponent
          },
        ]
      },
      {
        path: 'edit/:id',
        component: CreateSubjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
