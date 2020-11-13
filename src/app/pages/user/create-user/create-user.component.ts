import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ROLE_ADMIN, ROLE_PARENT, ROLE_TEACHER } from 'src/app/shared/models/constants';
import { NotifyService } from 'src/app/shared/notify/notify.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  usersForm: FormGroup;
  isLinear = false;
  formErrors: any = {};
  roles = [
    {
      value: 2,
      label: ROLE_ADMIN
    },
    {
      value: 3,
      label: ROLE_TEACHER
    },
    {
      value: 4,
      label: ROLE_PARENT
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      name: [''],
      role_id: [''],
      gender: [''],
      address: [''],
      email: [''],
      username: [''],
      password: [''],
      phone: [''],
      dob: [''],
      emp_date: [''],
      city_id: ['']
    });

    this.activatedRoute.params.subscribe(params => this.editUser(params.id));
  }

  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateUser() : this.createUser();
  }

  async createUser(): Promise<void> {
    try {
      const { success, message } = await this.userService.createUser(this.usersForm.value).toPromise();
      if (success) {
        alert(message);
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateUser(): Promise<void> {
    try {
      const params = this.usersForm.value;
      params._method = 'PUT';
      const { success, message } = await this.userService.update(this.activatedRoute.snapshot.params.id, params).toPromise();
      if (success) {
        alert(message);
        this.editUser(this.activatedRoute.snapshot.params.id);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async editUser(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.userService.edit(id).toPromise();
      this.usersForm.patchValue({
        id: data.id,
        name: data.name,
        role_id: data.roles[0].id,
        gender: data.gender,
        address: data.address,
        email: data.email,
        phone: data.phone,
        city_id: data.city_id,
        dob: data.dob,
        age: data.age,
        emp_date: data?.staff?.emp_date ? data?.staff?.emp_date : ''
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.usersForm.reset();
  }

}
