import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {

  classesForm: FormGroup;
  isLinear = false;
  formErrors: any = {};
  classTypes$: Observable<any>;


  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.classesForm = this.formBuilder.group({
      name: [''],
      class_type_id: ['']
    });

    this.classTypes$ = this.commonService.getClassType();

    this.activatedRoute.params.subscribe(params => this.editClass(params.id));
  }

  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateClass() : this.createClass();
  }

  async createClass(): Promise<void> {
    try {
      const { success, message } = await this.classService.create(this.classesForm.value).toPromise();
      if (success) {
        alert(message);
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateClass(): Promise<void> {
    try {
      const { success, message } = await this.classService.update(this.activatedRoute.snapshot.params.id, this.classesForm.value).toPromise();
      if (success) {
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }


  async editClass(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.classService.edit(id).toPromise();
      this.classesForm.patchValue({
        name: data.name,
        class_type_id: data.class_type_id,
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.classesForm.reset();
  }


}
