import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSignleComponent } from './main-signle.component';

describe('MainSignleComponent', () => {
  let component: MainSignleComponent;
  let fixture: ComponentFixture<MainSignleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSignleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSignleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
