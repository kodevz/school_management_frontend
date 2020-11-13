import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-manage-grade',
  templateUrl: './manage-grade.component.html',
  styleUrls: ['./manage-grade.component.scss']
})
export class ManageGradeComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('manageGradeTable', { static: false }) private _manageGradeTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();

  constructor(
    public datatableService: DatatableService,
    private gradeService: GradeService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initGrades(event: LazyLoadEvent): void {
    const params = { page: event.first + 1 };
    this.gradeService.listGrades(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  reload(): void {
    this._manageGradeTable.reset();
  }

}
