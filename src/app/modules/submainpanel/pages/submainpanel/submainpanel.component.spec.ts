import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmainpanelComponent } from './submainpanel.component';

describe('SubmainpanelComponent', () => {
  let component: SubmainpanelComponent;
  let fixture: ComponentFixture<SubmainpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmainpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmainpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
