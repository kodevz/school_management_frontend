import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from 'src/app/shared/api/api.service';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { ColumnFilterOptions, DTPageOptions } from 'src/app/shared/models/dtoptions';
import { Table } from 'primeng/table';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.scss']
})
export class ManageClassComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  readonly stateKey = 'ManageClassComponent';

  readonly rowsLength = 15;

  @ViewChild('manageClassTable', { static: false }) private _manageClassTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();


  constructor(
    private el: ElementRef,
    public datatableService: DatatableService,
    public api: ApiService,
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    private classService: ClassService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initClasses(event: LazyLoadEvent): void {
    const params = {page: event.first + 1};
    this.classService.listClasses(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total; 
    });
  }

  reload(): void {
    this._manageClassTable.reset();
  }
}
