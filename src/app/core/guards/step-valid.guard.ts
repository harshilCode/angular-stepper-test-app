// core/guards/step-valid.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StepperStateService } from '@/core/services/stepper-state.service';

@Injectable({ providedIn: 'root' })
export class StepValidGuard implements CanActivate {
  constructor(private stepper: StepperStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const target = state.url;

    if (!this.stepper.isKnownStep(target)) {
      const first = this.stepper.firstStepUrl();
      return first === target ? true : this.router.parseUrl(first);
    }

    if (!this.stepper.isReachable(target)) {
      const firstInvalid = this.stepper.firstIncompleteUrl();
      return firstInvalid === target ? true : this.router.parseUrl(firstInvalid);
    }

    return true;
    }
}
