import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  subjectForm: FormGroup;
  isLinear = false;
  formErrors: any = {};
  classes$: Observable<any>;
  staffs$: Observable<any>;


  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      name: [''],
      class_id: [''],
      teacher_id: [''],
      slug: [''],
    });

    this.classes$ = this.commonService.getClass();
    this.staffs$ = this.commonService.getStaffs();
    this.activatedRoute.params.subscribe(param => this.editSubject(param.id));
  }

  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateSubject() : this.createSubject();
  }

  async createSubject(): Promise<void> {
    try {
      const { success, message } = await this.subjectService.create(this.subjectForm.value).toPromise();
      if (success) {
        alert(message);
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateSubject(): Promise<void> {
    try {
      const { success, message } = await this.subjectService.update(this.activatedRoute.snapshot.params.id, this.subjectForm.value).toPromise();
      if (success) {
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }


  async editSubject(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.subjectService.edit(id).toPromise();
      this.subjectForm.patchValue({
        name: data.name,
        class_id: data.class_id,
        teacher_id: data.teacher_id,
        slug: data.slug
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.subjectForm.reset();
  }

}
