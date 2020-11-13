import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.scss']
})
export class ManageExamComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('manageExamTable', { static: false }) private _manageExamTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();

  constructor(
    public datatableService: DatatableService,
    private examService: ExamService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initExams(event: LazyLoadEvent): void {
    const params = { page: event.first + 1 };
    this.examService.listExams(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  reload(): void {
    this._manageExamTable.reset();
  }

}
