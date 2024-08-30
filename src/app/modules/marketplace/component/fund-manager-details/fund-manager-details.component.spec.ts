import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundManagerDetailsComponent } from './fund-manager-details.component';

describe('FundManagerDetailsComponent', () => {
  let component: FundManagerDetailsComponent;
  let fixture: ComponentFixture<FundManagerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundManagerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
