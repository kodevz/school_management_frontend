import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('manageStudentTable', { static: false }) private _manageStudentTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();


  constructor(
    public datatableService: DatatableService,
    private studentService: StudentService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initStudentInfo(event: LazyLoadEvent): void {
    const params = {page: event.first + 1};
    this.studentService.listStudents(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total; 
    });
  }

  editStudent(id): void {
    this.router.navigate(['/student/admission-edit', id])
  }

  reload(): void {
    this._manageStudentTable.reset();
  }

}
