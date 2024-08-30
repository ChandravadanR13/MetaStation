import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsAddComponent } from './funds-add.component';

describe('FundsAddComponent', () => {
  let component: FundsAddComponent;
  let fixture: ComponentFixture<FundsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
