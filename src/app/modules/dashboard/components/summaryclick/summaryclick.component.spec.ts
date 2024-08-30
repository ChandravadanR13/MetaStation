import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryclickComponent } from './summaryclick.component';

describe('SummaryclickComponent', () => {
  let component: SummaryclickComponent;
  let fixture: ComponentFixture<SummaryclickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryclickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
