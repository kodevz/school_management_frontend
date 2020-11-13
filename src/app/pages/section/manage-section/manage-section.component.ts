import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/shared/api/api.service';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-manage-section',
  templateUrl: './manage-section.component.html',
  styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  readonly stateKey = 'ManageSectionComponent';

  readonly rowsLength = 15;

  @ViewChild('manageSectionTable', { static: false }) private _manageSectionTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();


  constructor(
    public datatableService: DatatableService,
    public api: ApiService,
    private sectionService: SectionService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initSections(event: LazyLoadEvent): void {
    const params = { page: event.first + 1 };
    this.sectionService.listSections(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  reload(): void {
    this._manageSectionTable.reset();
  }
}
