import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent implements OnInit {

  sectionForm: FormGroup;
  isLinear = false;
  formErrors: any = {};
  classes$: Observable<any>;
  staffs$: Observable<any>;


  constructor(
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sectionForm = this.formBuilder.group({
      name: [''],
      class_id: [''],
      teacher_id: [''],
    });

    this.classes$ = this.commonService.getClass();
    this.staffs$ = this.commonService.getStaffs();
    this.activatedRoute.params.subscribe(param => {
      console.log(param)
    });
    this.activatedRoute.params.subscribe(param => this.editSection(param.id));
  }

  async submitForm(): Promise<void> {
    console.log(this.sectionForm.value);
    this.activatedRoute.snapshot.params.id ? this.updateSection() : this.createSection();
  }

  async createSection(): Promise<void> {
    try {
      const { success, message } = await this.sectionService.create(this.sectionForm.value).toPromise();
      if (success) {
        alert(message);
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateSection(): Promise<void> {
    try {
      const { success, message } = await this.sectionService.update(this.activatedRoute.snapshot.params.id, this.sectionForm.value).toPromise();
      if (success) {
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }


  async editSection(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.sectionService.edit(id).toPromise();
      this.sectionForm.patchValue({
        name: data.name,
        class_id: data.class_id,
        teacher_id: data.teacher_id
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.sectionForm.reset();
  }

}
