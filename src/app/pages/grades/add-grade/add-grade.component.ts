import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements OnInit {

  gradeForm: FormGroup;
  isLinear = false;
  formErrors: any = {};
  classTypes$: Observable<any>;
  remarks$: Observable<any>;


  constructor(
    private formBuilder: FormBuilder,
    private gradeService: GradeService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gradeForm = this.formBuilder.group({
      name: [''],
      class_type_id: [''],
      mark_from: [''],
      mark_to: [''],
      remark: [''],
    });

    this.classTypes$ = this.commonService.getClassType();
    this.remarks$ = this.commonService.getRemarks();

    this.activatedRoute.params.subscribe(param => this.editGrade(param.id));
  }

  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateGrade() : this.createGrade();
  }

  async createGrade(): Promise<void> {
    try {
      const { success, message } = await this.gradeService.create(this.gradeForm.value).toPromise();
      if (success) {
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateGrade(): Promise<void> {
    try {
      const { success, message } = await this.gradeService.update(this.activatedRoute.snapshot.params.id, this.gradeForm.value).toPromise();
      if (success) {
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async editGrade(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.gradeService.edit(id).toPromise();
      this.gradeForm.patchValue({
        name: data.name,
        class_type_id: data.class_type_id,
        mark_from: data.mark_from,
        mark_to: data.mark_to,
        remark: data.remark,
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.gradeForm.reset();
  }

}
