import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, EventEmitter, inject, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { tap } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-custom-chip',
  templateUrl: './custom-chip.component.html',
  styleUrls: ['./custom-chip.component.css']
})
export class CustomChipComponent implements OnInit ,AfterViewInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');
  filteredItems: Observable<string[]>;
  items: string[] = [];


  @Input() filteredItemsInput: string[] = [];

  @Input() allItems: string[] = [];
  @Input() inSelectedItems: string[] = [];
  @Input() filterFn!: (term: string) => Observable<string[]>;
  @Input() palceHolderNameStrin: string = '';
  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;
  @Output() selectedItems = new EventEmitter<string[]>();
  announcer = inject(LiveAnnouncer);
  @ViewChild('auto') matAutocomplete!: MatAutocompleteTrigger;
  private filteredItemsSubject = new BehaviorSubject<string[]>([]);
  @ViewChild('input') input!: ElementRef; 

  constructor(public readonly keycloak: KeycloakService) {
    // this.filteredItems = this.itemCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((item: string | null) => (item ? this.filterFn(item) : this.allItems.slice())),
    // );

    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value ?? ''),
      switchMap(value => this.filterFn(value))
    );
  }
  ngAfterViewInit(): void {
    // this.input.nativeElement.focus(); 

    this.input.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
         console.log('tab');
         event.preventDefault(); // Prevent default Tab behavior
         this.simulateEnterKeyPress(); 
      }
    }); 
  
  }

  simulateEnterKeyPress(): void {
    const enterKeyEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
    });

    this.input.nativeElement.dispatchEvent(enterKeyEvent);
  }
 ngOnInit() {
  this.keycloak.isLoggedIn().then((isLoggedIn) => {
    if (!isLoggedIn) {
      this.keycloak.login();
    }
  });
    // Set the initial value from filteredItemsInput
    //  this.matAutocomplete.options = this.allItems; 
    // debugger
    if (this.filteredItemsInput && this.filteredItemsInput.length > 0) {
      for (let i = 0; i < this.filteredItemsInput.length; i++) { 
        this.items.push(this.filteredItemsInput[i]);
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // debugger
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
    // debugger
    const value = event.option.viewValue;
    if (value && !this.items.includes(value)) {
      this.items.push(value);
      this.selectedItems.emit(this.items);
    }
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);

  }
}
