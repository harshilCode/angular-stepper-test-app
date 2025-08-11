// core/models/form-types.ts
import { FormControl } from '@angular/forms';
import { Audience } from './app.models';

export interface SelectCategoriesForm {
  web: FormControl<boolean>;
  mobile: FormControl<boolean>;
  desktop: FormControl<boolean>;
  wireframe: FormControl<boolean>;
}

export interface AppInfoForm {
  name: FormControl<string>;
  description: FormControl<string>;
  url: FormControl<string>;
}

export interface AppAudienceForm {
  audience: FormControl<Audience[]>;
}

export interface AudienceWorkforceForm {
  q1: FormControl<string>;
  q2: FormControl<string>;
}

export interface AudienceCustomerForm {
  q1: FormControl<string>;
  q2: FormControl<string>;
}
