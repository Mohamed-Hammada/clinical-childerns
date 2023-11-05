import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHistoryTableComponent } from './child-history-table.component';

describe('ChildHistoryTableComponent', () => {
  let component: ChildHistoryTableComponent;
  let fixture: ComponentFixture<ChildHistoryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildHistoryTableComponent]
    });
    fixture = TestBed.createComponent(ChildHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
