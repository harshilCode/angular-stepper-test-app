// features/stepper/components/steps/app-audience/app-audience.component.ts
import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { Audience } from '@/core/models/app.models';

@Component({
  selector: 'app-audience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './app-audience.component.html'
})
export class AppAudienceComponent {
  form!: FormGroup;
  appId = '';
  appName = '';
  options: Audience[] = ['workforce', 'client', 'customer'];

  constructor(public stepper: StepperStateService, private router: Router) {
    const url = this.router.url.replace('/stepper/', '');
    const step = stepper['_snapshot$'].value.steps.find(s => s.id === url);
    if (step?.formKey && step.appId) {
      this.form = stepper['_snapshot$'].value.forms[step.formKey];
      this.appId = step.appId;
      const app = stepper['_snapshot$'].value.apps.find(a => a.id === step.appId);
      this.appName = app?.name ?? '';
    }
  }

  toggle(a: Audience, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current: Audience[] = this.form.value.audience || [];
    const next = checked ? Array.from(new Set([...current, a])) : current.filter(x => x !== a);
    this.form.patchValue({ audience: next });
    this.stepper.onAudienceChange(this.appId); // rebuild dynamic sub-steps
  }
}
