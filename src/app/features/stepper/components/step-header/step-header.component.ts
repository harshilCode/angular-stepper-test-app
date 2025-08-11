// features/stepper/components/step-header/step-header.component.ts
import { Component } from '@angular/core';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-header',
  standalone: true,
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss']
})
export class StepHeaderComponent {
  constructor(public stepper: StepperStateService, private router: Router) {}

  cancel() {
    this.router.navigateByUrl('/');
  }

  async submit() {
    await this.stepper.submit();
    // After submit, navigate to a success page or show toast
    alert('Submitted! Check console for payload.');
  }
}
