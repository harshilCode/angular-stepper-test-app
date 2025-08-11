// core/resolvers/apps.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StepperStateService } from '../services/stepper-state.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppsResolver implements Resolve<boolean> {
  constructor(private stepper: StepperStateService) {}
  async resolve() {
    // If categories are chosen and apps not yet fetched, fetch them.
    await this.stepper.ensureAppsLoaded();
    return true;
  }
}
