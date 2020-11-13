import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  examForm: FormGroup;
  isLinear = false;
  formErrors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.examForm = this.formBuilder.group({
      name: [''],
      term: [''],
      year: ['']
    });
    this.activatedRoute.params.subscribe(param => this.editExam(param.id));
  }

  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateExam() : this.createExam();
  }

  async createExam(): Promise<void> {
    try {
      const { success, message } = await this.examService.create(this.examForm.value).toPromise();
      if (success) {
        this.reset();
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateExam(): Promise<void> {
    try {
      const { success, message } = await this.examService.update(this.activatedRoute.snapshot.params.id, this.examForm.value).toPromise();
      if (success) {
        alert(message);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async editExam(id: string | number): Promise<void> {
    if (!id) return;
    try {
      const { data } = await this.examService.edit(id).toPromise();
      this.examForm.patchValue({
        name: data.name,
        year: data.year,
        term: data.term
      });
    } catch ({ error }) {
      console.log(error);
    }
  }

  reset(): void {
    this.examForm.reset();
  }

}
