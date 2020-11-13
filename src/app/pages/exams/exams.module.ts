import { NgModule } from '@angular/core';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ExamsComponent, ManageExamComponent, AddExamComponent],
  imports: [
    SharedModule,
    ExamsRoutingModule
  ]
})
export class ExamsModule { }
