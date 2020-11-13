import { NgModule } from '@angular/core';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { ManageSubjectComponent } from './manage-subject/manage-subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SubjectsComponent, ManageSubjectComponent, CreateSubjectComponent],
  imports: [
    SharedModule,
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }
