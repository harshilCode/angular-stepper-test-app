// features/stepper/components/steps/audience-customer/audience-customer.component.ts
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audience-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './audience-customer.component.html'
})
export class AudienceCustomerComponent {
  form!: FormGroup;
  appName = '';
  constructor(public stepper: StepperStateService, private router: Router) {
    const url = this.router.url.replace('/stepper/', '');
    const step = stepper['_snapshot$'].value.steps.find(s => s.id === url);
    if (step?.formKey && step.appId) {
      this.form = stepper['_snapshot$'].value.forms[step.formKey];
      const app = stepper['_snapshot$'].value.apps.find(a => a.id === step.appId);
      this.appName = app?.name ?? '';
    }
  }
}
