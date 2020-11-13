import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSectionComponent } from './create-section/create-section.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { SectionComponent } from './section.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SectionComponent,
        data: {
          title: 'Section'
        },
        children: [
          {
            path: '',
            redirectTo: 'manage'
          },
          {
            path: 'manage',
            component: ManageSectionComponent
          },
          {
            path: 'create',
            component: CreateSectionComponent
          }
        ]
      },
      {
        path: 'edit/:id',
        component: CreateSectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
