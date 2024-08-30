import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTradinglComponent } from './main-tradingl.component';

describe('MainTradinglComponent', () => {
  let component: MainTradinglComponent;
  let fixture: ComponentFixture<MainTradinglComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTradinglComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTradinglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
