import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-st-select',
  templateUrl: './st-select.component.html',
  styleUrls: ['./st-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StSelectComponent),
    multi: true
  }]
})
export class StSelectComponent implements ControlValueAccessor, AfterViewInit {

  @Input() label: String;
  @Input() formControlName: String;
  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor;

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();

  ngAfterViewInit(): void {
    this.delegatedMethodCalls.subscribe(fn => fn(this.valueAccessor));
  }

  registerOnChange(fn: (_: any) => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnChange(fn));
  }
  registerOnTouched(fn: () => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnTouched(fn));
  }

  setDisabledState(isDisabled: boolean): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.setDisabledState(isDisabled));
  }

  writeValue(obj: any): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.writeValue(obj));
  }

}
