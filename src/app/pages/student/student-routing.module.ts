import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionComponent } from './admission/admission.component';
import { StudentInfoComponent } from './student-info/student-info.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'admission'
      },
      {
        path: 'admission',
        component: AdmissionComponent,
        data: {
          title: 'Student Admission'
        },
        pathMatch: 'full'
      },
      {
        path: 'admission-edit/:id',
        component: AdmissionComponent,
        data: {
          title: 'Edit Student Info'
        },
        pathMatch: 'full'
      },
      {
        path: 'student-info',
        component: StudentInfoComponent,
        data: {
          title: 'Student Information'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
