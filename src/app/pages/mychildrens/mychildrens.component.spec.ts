import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MychildrensComponent } from './mychildrens.component';

describe('MychildrensComponent', () => {
  let component: MychildrensComponent;
  let fixture: ComponentFixture<MychildrensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MychildrensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MychildrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
