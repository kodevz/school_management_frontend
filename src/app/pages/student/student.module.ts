import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { AdmissionComponent } from './admission/admission.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdmissionComponent, StudentInfoComponent],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
