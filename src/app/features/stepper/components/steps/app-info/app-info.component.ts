// features/stepper/components/steps/app-info/app-info.component.ts
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-info.component.html'
})
export class AppInfoComponent {
  form!: FormGroup;
  appName = '';

  constructor(public stepper: StepperStateService, private router: Router) {
    const step = this.stepper.stepFromUrl(this.router.url);
    if (step?.formKey && step.appId) {
      this.form = this.stepper.getForm(step.formKey);
      this.appName = this.stepper.getApp(step.appId)?.name ?? '';
    }
  }
}
