// core/models/step.models.ts
import { Type } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AppItem } from './app.models';

export interface StepDef {
  id: string;                       // unique route segment, e.g. "select" or "web/web-1/info"
  label: string;                    // shown in header / summary
  component: Type<any>;             // component to render
  formKey?: string;                 // key in state.forms map
  appId?: string;                   // if tied to a specific app
  isEnabled?: () => boolean;        // optional gating
  isComplete?: () => boolean;       // step completion (for nav/submit)
}

export interface StepperSnapshot {
  currentIndex: number;
  steps: StepDef[];
  selectedCategories: Set<string>; // 'web','mobile',...
  apps: AppItem[];                 // created after categories are chosen
  forms: Record<string, FormGroup>;
  allValid: boolean;
}
