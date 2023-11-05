import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ViewToggleComponent),
      multi: true,
    },
  ],
})
export class ViewToggleComponent {
  @Input() isCardView: boolean = true;
  @Output() viewModeChange = new EventEmitter<boolean>();

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: any): void {
    this.isCardView = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleView(viewMode: boolean) {
    this.isCardView = viewMode;
    this.onChange(this.isCardView); // Notify the form control of changes
    this.viewModeChange.emit(this.isCardView);
  
  }
}
