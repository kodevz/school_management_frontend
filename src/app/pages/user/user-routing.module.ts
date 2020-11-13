import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
      path: '',
      children: [
        {
          path: '',
          component: UserComponent,
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
              component: ManageUserComponent
            },
            {
              path: 'create',
              component: CreateUserComponent
            },
            {
              path: 'edit/:id',
              component: CreateUserComponent
            },
          ]
        },
        {
          path: 'edit',
          component: CreateUserComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
