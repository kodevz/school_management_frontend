import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarksheetComponent } from './view-marksheet.component';

describe('ViewMarksheetComponent', () => {
  let component: ViewMarksheetComponent;
  let fixture: ComponentFixture<ViewMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMarksheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
