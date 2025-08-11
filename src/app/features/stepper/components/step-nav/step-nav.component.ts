// features/stepper/components/step-nav/step-nav.component.ts
import { Component } from '@angular/core';
import { StepperStateService } from '@/core/services/stepper-state.service';

@Component({
  selector: 'app-step-nav',
  standalone: true,
  templateUrl: './step-nav.component.html',
  styleUrls: ['./step-nav.component.scss']
})
export class StepNavComponent {
  constructor(public stepper: StepperStateService) {}
}
