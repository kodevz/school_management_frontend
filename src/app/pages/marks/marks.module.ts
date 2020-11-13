import { NgModule } from '@angular/core';
import { MarksRoutingModule } from './marks-routing.module';
import { ManageMarksComponent } from './manage-marks/manage-marks.component';
import { MarkSheetComponent } from './mark-sheet/mark-sheet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewMarksheetComponent } from './view-marksheet/view-marksheet.component';


@NgModule({
  declarations: [ManageMarksComponent, MarkSheetComponent, ViewMarksheetComponent],
  imports: [
    SharedModule,
    MarksRoutingModule
  ]
})
export class MarksModule { }
