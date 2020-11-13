import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [ManageUserComponent, UserComponent, CreateUserComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
