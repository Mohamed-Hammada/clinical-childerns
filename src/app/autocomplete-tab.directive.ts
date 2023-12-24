import { Directive, AfterViewInit } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { UP_ARROW, DOWN_ARROW, TAB } from '@angular/cdk/keycodes';

@Directive({ selector: '[tab-selected]' })
export class TabSelected implements AfterViewInit {
  constructor(private auto: MatAutocomplete) {}
  ngAfterViewInit() {
    this.auto._keyManager.onKeydown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case TAB:
          if (this.auto.isOpen) {
            const option = this.auto.options.find(x => x.active);
            if (option) {
              option.select();
              event.preventDefault();
              return;
            }
          }
          this.auto._keyManager.tabOut.next();
          break;
        case DOWN_ARROW:
          this.auto._keyManager.setNextItemActive();
          break;

        case UP_ARROW:
          this.auto._keyManager.setPreviousItemActive();
          break;
      }
    };
  }
}
