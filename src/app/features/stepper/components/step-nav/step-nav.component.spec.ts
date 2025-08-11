import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepNavComponent } from './step-nav.component';

describe('StepNavComponent', () => {
  let component: StepNavComponent;
  let fixture: ComponentFixture<StepNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
