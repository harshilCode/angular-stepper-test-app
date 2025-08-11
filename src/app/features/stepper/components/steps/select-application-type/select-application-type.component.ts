// features/stepper/components/steps/select-application-type/select-application-type.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StepperStateService } from '@/core/services/stepper-state.service';


@Component({
  selector: 'app-select-application-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-application-type.component.html'
})
export class SelectApplicationTypeComponent {
  form: FormGroup;
  
  constructor(public stepper: StepperStateService) {
    this.form = this.stepper.getForm('select.categories');
  }

  onChange() {
    this.stepper.updateSelectedCategories();
    // enabling Next when at least one is selected is already handled by step.isComplete()
  }
}
