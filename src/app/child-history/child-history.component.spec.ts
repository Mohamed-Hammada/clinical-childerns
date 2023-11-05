import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHistoryComponent } from './child-history.component';

describe('ChildHistoryComponent', () => {
  let component: ChildHistoryComponent;
  let fixture: ComponentFixture<ChildHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildHistoryComponent]
    });
    fixture = TestBed.createComponent(ChildHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
