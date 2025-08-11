// features/stepper/stepper.routes.ts
import { Routes } from '@angular/router';
import { StepShellComponent } from './components/step-shell/step-shell.component';
import { ReviewComponent } from './components/steps/review/review.component';
import { StepValidGuard } from '@/core/guards/step-valid.guard';
import { StepContentHostComponent } from './components/step-shell/step-content-host.component';

export const STEPPER_ROUTES: Routes = [
  {
    path: '',
    component: StepShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'select' },
      { path: 'select', component: StepContentHostComponent, canActivate: [StepValidGuard] },
      { path: 'review', component: ReviewComponent, canActivate: [StepValidGuard] },
      // IMPORTANT: use the tiny host here, NOT StepShellComponent
      { path: '**', component: StepContentHostComponent, canActivate: [StepValidGuard] },
    ]
  }
];
