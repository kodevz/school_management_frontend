import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMarksComponent } from './manage-marks/manage-marks.component';
import { MarkSheetComponent } from './mark-sheet/mark-sheet.component';
import { ViewMarksheetComponent } from './view-marksheet/view-marksheet.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ManageMarksComponent,
        data: {
          title: 'Manage Marks'
        }
      },
      {
        path: 'mark-sheet',
        component: MarkSheetComponent,
        data: {
          title: 'MarkSheet'
        }
      },
      {
        path: 'view-mark-sheet',
        component: ViewMarksheetComponent,
        data: {
          title: 'View Mark Sheet'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksRoutingModule { }
