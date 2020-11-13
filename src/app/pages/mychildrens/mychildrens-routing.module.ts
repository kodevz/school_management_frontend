import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MychildrensComponent } from './mychildrens.component';

const routes: Routes = [
  {
      path: '',
      children: [
        {
          path: '',
          component: MychildrensComponent,
          data: {
            title: 'My Childrens'
          }
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MychildrensRoutingModule { }
