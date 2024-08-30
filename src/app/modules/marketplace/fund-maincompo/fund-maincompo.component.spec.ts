import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundMaincompoComponent } from './fund-maincompo.component';

describe('FundMaincompoComponent', () => {
  let component: FundMaincompoComponent;
  let fixture: ComponentFixture<FundMaincompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundMaincompoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundMaincompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
