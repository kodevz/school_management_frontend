import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    MenubarModule,
    SidebarModule,
    SlideMenuModule,
    ButtonModule,
    PanelMenuModule,
    TableModule
  ]
})
export class PrimengModule { }
