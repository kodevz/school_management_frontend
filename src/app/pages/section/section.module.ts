import { NgModule } from '@angular/core';
import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { CreateSectionComponent } from './create-section/create-section.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SectionComponent, CreateSectionComponent, ManageSectionComponent],
  imports: [
    SharedModule,
    SectionRoutingModule
  ]
})
export class SectionModule { }
