import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHistoryCardsComponent } from './child-history-cards.component';

describe('ChildHistoryCardsComponent', () => {
  let component: ChildHistoryCardsComponent;
  let fixture: ComponentFixture<ChildHistoryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildHistoryCardsComponent]
    });
    fixture = TestBed.createComponent(ChildHistoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
