// features/stepper/components/summary/summary.component.ts
import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common'; 
import { StepperStateService } from '@/core/services/stepper-state.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  public arrayFrom = Array.from;
  constructor(public stepper: StepperStateService) {}
}
