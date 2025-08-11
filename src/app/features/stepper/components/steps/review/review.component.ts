// features/stepper/components/steps/review/review.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { StepperStateService } from '@/core/services/stepper-state.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './review.component.html'
})
export class ReviewComponent {
  private route = inject(ActivatedRoute);

  constructor(public stepper: StepperStateService, private router: Router) {}

  edit(stepUrl: string) {
    console.log('Editing step:', stepUrl); //mobile/mobile-1/info
    this.router.navigate([stepUrl], { relativeTo: this.route });
  }
}
