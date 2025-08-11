// features/stepper/components/step-shell/step-shell.component.ts
import { Component, OnDestroy, OnInit, ViewContainerRef, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subscription, merge } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { StepHeaderComponent } from '../step-header/step-header.component';
import { SummaryComponent } from '../summary/summary.component';
import { StepNavComponent } from '../step-nav/step-nav.component';

@Component({
  selector: 'app-step-shell',
  standalone: true,
  imports: [RouterOutlet, StepHeaderComponent, SummaryComponent, StepNavComponent],
  templateUrl: './step-shell.component.html',
  styleUrls: ['./step-shell.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // allow custom elements in templates
})
export class StepShellComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  private vc = inject(ViewContainerRef);

  constructor(public stepper: StepperStateService, private router: Router) {}

  ngOnInit() {
    this.sub.add(
      merge(
        this.stepper.snapshot$,
        this.router.events.pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          startWith(null) // fire once on init
        )
      ).subscribe(() => this.renderCurrent())
    );
  }

  private renderCurrent() {
    const snap = this.stepper.snapshot;
    const id = this.stepper.currentStepId(); // <-- fallback to 'select'
    const step = snap.steps.find(st => st.id === id) ?? snap.steps[0];
    this.vc.clear();
    if (step?.component) this.vc.createComponent(step.component);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }
}
