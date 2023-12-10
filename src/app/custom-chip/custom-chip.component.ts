import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-custom-chip',
  templateUrl: './custom-chip.component.html',
  styleUrls: ['./custom-chip.component.css']
})
export class CustomChipComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');
  filteredItems: Observable<string[]>;
  items: string[] = [];
  

  @Input() allItems: string[] = [];
  @Input() filterFn!: (term: string) => Observable<string[]>;
  @Input() palceHolderNameStrin :string = '';
  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;
  @Output() selectedItems = new EventEmitter<string[]>();
  announcer = inject(LiveAnnouncer);

  constructor() {
    // this.filteredItems = this.itemCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((item: string | null) => (item ? this.filterFn(item) : this.allItems.slice())),
    // );

    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map(value => value ?? ''),
      switchMap(value => this.filterFn(value))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    debugger
    // Add our item
    if (value && !this.items.includes(value)) {
      this.selectedItems.emit(this.items);
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
      this.selectedItems.emit(this.items);
      this.announcer.announce(`Removed ${item}`);
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    debugger
    const value = event.option.viewValue;
    if (value && !this.items.includes(value)) {
      this.items.push(value);
      this.selectedItems.emit(this.items);
    }
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);

  }
}
