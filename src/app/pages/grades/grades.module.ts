import { NgModule } from '@angular/core';
import { GradesRoutingModule } from './grades-routing.module';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { ManageGradeComponent } from './manage-grade/manage-grade.component';
import { GradesComponent } from './grades.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddGradeComponent, ManageGradeComponent, GradesComponent],
  imports: [
    SharedModule,
    GradesRoutingModule
  ]
})
export class GradesModule { }
