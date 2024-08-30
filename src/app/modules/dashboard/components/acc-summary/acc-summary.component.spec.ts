import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccSummaryComponent } from './acc-summary.component';

describe('AccSummaryComponent', () => {
  let component: AccSummaryComponent;
  let fixture: ComponentFixture<AccSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
