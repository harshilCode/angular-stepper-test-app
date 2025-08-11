import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepShellComponent } from './step-shell.component';

describe('StepShellComponent', () => {
  let component: StepShellComponent;
  let fixture: ComponentFixture<StepShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
