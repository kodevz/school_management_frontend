import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  expand = true;
  isLinear = false;
  studentAdmissionForm: FormGroup;
  classes$: Observable<any>;
  sections$: Observable<any>;
  parents$: Observable<any>;
  formErrors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.studentAdmissionForm = this.formBuilder.group({
      id: [''],
      name: [''],
      role_id: [''],
      gender: [''],
      address: [''],
      email: [''],
      phone: [''],
      dob: [''],
      emp_date: [''],
      city_id: [''],
      class_id: [''],
      section_id: [''],
      parent_id: [''],
      age: [''],
      admission_date: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      this.editStudent(params.id);
    });

    this.classes$ = this.commonService.getClass();
    this.parents$ = this.commonService.getParent();
  }


  async submitForm(): Promise<void> {
    this.activatedRoute.snapshot.params.id ? this.updateStudentAdmission() : this.createStudentAdmission();
  }

  async createStudentAdmission(): Promise<void> {
    try {
      const { success, message } = await this.studentService.create(this.studentAdmissionForm.value).toPromise();
      if (success) {
        alert(message);
        this.reset();
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async updateStudentAdmission(): Promise<void> {
    try {
      const params = this.studentAdmissionForm.value;
      params._method = 'PUT';
      
      const { success, message } = await this.studentService.update(this.studentAdmissionForm.get('id').value, params).toPromise();
      if (success) {
        alert(message);
        this.editStudent(this.activatedRoute.snapshot.params.id);
      }
    } catch ({ error }) {
      this.formErrors = error.errors;
    }
  }

  async editStudent(id: string | number): Promise<void> {
    try {
      const { data } = await this.studentService.editStudent(id).toPromise();
      this.studentAdmissionForm.patchValue({
        id: data.user.id,
        name: data.user.name,
        role_id: data.user.roles[0].id,
        gender: data.user.gender,
        address: data.user.address,
        email: data.user.email,
        phone: data.user.phone,
        city_id: data.user.city_id,
        class_id: data.class_id,
        section_id: data.section_id,
        parent_id: data.parent_id,
        dob: data.user.dob,
        age: data.age,
        admission_date: data.admission_date
      });

      this.loadSections({ class_id: data.class_id });

    } catch ({ error }) {
      console.log(error);
    }
  }

  onChangeClass(event): void {
    this.loadSections({ class_id: event.value });
  }

  loadSections(params) {
    this.sections$ = this.commonService.getSection(params);
  }

  reset(): void {
    this.studentAdmissionForm.reset();
  }
}
