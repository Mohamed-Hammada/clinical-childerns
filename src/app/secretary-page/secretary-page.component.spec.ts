import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryPageComponent } from './secretary-page.component';

describe('SecretaryPageComponent', () => {
  let component: SecretaryPageComponent;
  let fixture: ComponentFixture<SecretaryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretaryPageComponent]
    });
    fixture = TestBed.createComponent(SecretaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
