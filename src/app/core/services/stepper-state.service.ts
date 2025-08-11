// core/services/stepper-state.service.ts
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppsApi } from './apps.api';
import {
  AppAudienceFormValue, AppInfoFormValue, AppItem, AppCategory, Audience,
  AudienceCustomerFormValue,
  AudienceWorkforceFormValue
} from '../models/app.models';
import { StepDef, StepperSnapshot } from '../models/step.models';
import {
  SelectCategoriesForm, AppInfoForm, AppAudienceForm,
  AudienceWorkforceForm, AudienceCustomerForm
} from '../models/form-types';

// Import step components
import { SelectApplicationTypeComponent } from '@/features/stepper/components/steps/select-application-type/select-application-type.component';
import { AppInfoComponent } from '@/features/stepper/components/steps/app-info/app-info.component';
import { AppAudienceComponent } from '@/features/stepper/components/steps/app-audience/app-audience.component';
import { AudienceWorkforceComponent } from '@/features/stepper/components/steps/audience-workforce/audience-workforce.component';
import { AudienceCustomerComponent } from '@/features/stepper/components/steps/audience-customer/audience-customer.component';

@Injectable({ providedIn: 'root' })
export class StepperStateService {
  private fb = new FormBuilder();

  private _snapshot$ = new BehaviorSubject<StepperSnapshot>({
    currentIndex: 0,
    steps: [],
    selectedCategories: new Set(),
    apps: [],
    forms: {},
    allValid: false
  });

  snapshot$ = this._snapshot$.asObservable();

  constructor(private api: AppsApi, private router: Router) {
    this.reset();
  }

  /** Initialize base step list with the first selection step */
  reset() {
    const forms: Record<string, FormGroup> = {
      'select.categories': this.fb.nonNullable.group<SelectCategoriesForm>({
        web: this.fb.nonNullable.control(false),
        mobile: this.fb.nonNullable.control(false),
        desktop: this.fb.nonNullable.control(false),
        wireframe: this.fb.nonNullable.control(false),
      }),
    };

    const steps: StepDef[] = [
      {
        id: 'select',
        label: 'Application Type',
        component: SelectApplicationTypeComponent,
        formKey: 'select.categories',
        isComplete: () => {
          const v = forms['select.categories'].getRawValue(); // typesafe booleans
          return v.web || v.mobile || v.desktop || v.wireframe;
        }
      }
    ];

    this._snapshot$.next({
      currentIndex: 0,
      steps,
      selectedCategories: new Set(),
      apps: [],
      forms,
      allValid: false
    });
  }

  /** Reads current categories and loads apps if needed, then (re)build steps */
  async ensureAppsLoaded() {
    const snap = this._snapshot$.value;
    const chosen = this.getChosenCategories();
    const needsApps = chosen.length && !snap.apps.length;

    if (needsApps) {
      const apps = await firstValueFrom(this.api.fetchApps(chosen));
      this._snapshot$.next({ ...snap, apps });
      this.rebuildSteps();
    }
  }

  get snapshot() {
    return this._snapshot$.value;
  }
  
  getForm(formKey: string) {
    const fg = this._snapshot$.value.forms[formKey];
    if (!fg) throw new Error(`Form not found: ${formKey}`);
    return fg;
  }
  
  getApp(appId: string) {
    return this._snapshot$.value.apps.find(a => a.id === appId);
  }
  
  stepFromUrl(url: string) {
    const id = this.normalizeUrl(url).replace('/stepper/', '');
    return this._snapshot$.value.steps.find(s => s.id === id);
  }

  getChosenCategories(): AppCategory[] {
    const v = this._snapshot$.value.forms['select.categories'].value;
    const all: AppCategory[] = [];
    if (v.web) all.push('web');
    if (v.mobile) all.push('mobile');
    if (v.desktop) all.push('desktop');
    if (v.wireframe) all.push('wireframe');
    return all;
  }

  /** Build the step list: select -> per-app steps -> review */
  rebuildSteps() {
    const snap = this._snapshot$.value;
    const steps: StepDef[] = [...snap.steps.filter(s => s.id === 'select')];

    // Build per-app steps in the order they come from backend
    snap.apps.forEach(app => {
      const infoKey = `app.${app.id}.info`;
      const audienceKey = `app.${app.id}.audience`;

      if (!snap.forms[infoKey]) {
        snap.forms[infoKey] = this.fb.nonNullable.group<AppInfoForm>({
          name: this.fb.nonNullable.control('', Validators.required),
          description: this.fb.nonNullable.control('', Validators.required),
          url: this.fb.nonNullable.control('', Validators.required),
        });
      }
      
      if (!snap.forms[audienceKey]) {
        snap.forms[audienceKey] = this.fb.nonNullable.group<AppAudienceForm>({
          audience: this.fb.nonNullable.control<Audience[]>([], Validators.minLength(1)),
        });
      }      

      steps.push({
        id: `${app.category}/${app.id}/info`,
        label: `${app.name} • Info`,
        component: AppInfoComponent,
        formKey: infoKey,
        appId: app.id,
        isComplete: () => snap.forms[infoKey].valid
      });

      steps.push({
        id: `${app.category}/${app.id}/audience`,
        label: `${app.name} • Audience`,
        component: AppAudienceComponent,
        formKey: audienceKey,
        appId: app.id,
        isComplete: () => snap.forms[audienceKey].valid
      });

      // Insert conditional audience sub-steps according to the current value
      const aud = (snap.forms[audienceKey].value?.audience ?? []) as Audience[];

      if (aud.includes('workforce')) {
        const key = `app.${app.id}.audience.workforce`;
        if (!snap.forms[key]) {
          snap.forms[key] = this.fb.nonNullable.group<AudienceWorkforceForm>({
            q1: this.fb.nonNullable.control('', Validators.required),
            q2: this.fb.nonNullable.control('', Validators.required),
          });
        }
        steps.push({
          id: `${app.category}/${app.id}/audience/workforce`,
          label: `${app.name} • Workforce`,
          component: AudienceWorkforceComponent,
          formKey: key,
          appId: app.id,
          isComplete: () => snap.forms[key].valid
        });
      }

      if (aud.includes('customer')) {
        const key = `app.${app.id}.audience.customer`;
        if (!snap.forms[key]) {
          snap.forms[key] = this.fb.nonNullable.group<AudienceCustomerForm>({
            q1: this.fb.nonNullable.control('', Validators.required),
            q2: this.fb.nonNullable.control('', Validators.required),
          });
        }
        steps.push({
          id: `${app.category}/${app.id}/audience/customer`,
          label: `${app.name} • Customer`,
          component: AudienceCustomerComponent,
          formKey: key,
          appId: app.id,
          isComplete: () => snap.forms[key].valid
        });
      }

      // (You can add 'client' similarly when its questions are known.)
    });

    // Review page:
    steps.push({
      id: 'review',
      label: 'Review & Submit',
      component: (null as unknown as Type<any>), // handled by dedicated route/component
      isComplete: () => this.areAllAppStepsComplete()
    });

    // Recalculate validity:
    const allValid = steps
      .filter(s => s.formKey)
      .every(s => this._snapshot$.value.forms[s.formKey!]?.valid);

    this._snapshot$.next({
      ...snap,
      steps,
      allValid
    });
  }

  /** Called when audience checkboxes change to add/remove sub-steps dynamically */
  onAudienceChange(appId: string) {
    this.rebuildSteps();
  }

  /** Navigation helpers */
  firstStepUrl() { return '/stepper/select'; }
  firstIncompleteUrl() {
    const s = this._snapshot$.value.steps.find(st => !st.isComplete?.());
    return `/stepper/${s?.id ?? 'review'}`;
  }
  isKnownStep(url: string) {
    const id = this.normalizeUrl(url);
    return this._snapshot$.value.steps.some(s => `/stepper/${s.id}` === id) || id.endsWith('/review');
  }
  normalizeUrl(url: string) {
    // e.g. '/stepper/web/web-1/info' keep as-is; strip query/fragment if needed
    return url.split('?')[0].split('#')[0];
  }
  
  isReachable(url: string) {
    const id = (this.normalizeUrl(url).replace('/stepper/', '') || 'select');
    const idx = this._snapshot$.value.steps.findIndex(s => s.id === id);
    if (idx < 0) return false;
    return this._snapshot$.value.steps.slice(0, idx).every(s => s.isComplete?.() ?? true);
  }

  currentStepId(): string {
    const raw = this.normalizeUrl(this.router.url).replace('/stepper/', '');
    return raw || 'select';
  }

  currentStepIndexFromUrl(url?: string) {
    const id = (url ? this.normalizeUrl(url).replace('/stepper/', '') : this.currentStepId()) || 'select';
    return this._snapshot$.value.steps.findIndex(s => s.id === id);
  }

  async gotoNext() {
    // make sure dynamic steps exist (after selecting categories / audiences)
    await this.ensureAppsLoaded();
  
    // if current step has a form, touch it so validators run
    const idx = this.currentStepIndexFromUrl();
    const step = this._snapshot$.value.steps[idx];
    if (step?.formKey) {
      this._snapshot$.value.forms[step.formKey].markAllAsTouched();
      this._snapshot$.value.forms[step.formKey].updateValueAndValidity();
    }
  
    // navigate to the first incomplete step (or review if all done)
    const nextUrl = this.firstIncompleteUrl();  // e.g. /stepper/web/web-1/info
    const curUrl  = this.normalizeUrl(this.router.url);
    if (nextUrl !== curUrl) {
      this.router.navigateByUrl(nextUrl);
    }
  }
  gotoPrev() {
    const idx = this.currentStepIndexFromUrl(this.router.url);
    const prev = this._snapshot$.value.steps[idx - 1];
    if (prev) this.router.navigate(['/stepper', prev.id]);
  }

  canGoPrev(): boolean {
    const idx = this.currentStepIndexFromUrl();
    return idx > 0 && !this.router.url.endsWith('/review');
  }
  canGoNext(): boolean {
    const idx = this.currentStepIndexFromUrl();
    const step = this._snapshot$.value.steps[idx];
    return !!step?.isComplete?.();
  }

  areAllAppStepsComplete() {
    return this._snapshot$.value.steps
      .filter(s => s.formKey)
      .every(s => this._snapshot$.value.forms[s.formKey!]?.valid);
  }

  /** Collected payload for backend */
  buildSubmitPayload() {
    const { selectedCategories, apps, forms } = this._snapshot$.value;
    return {
      categories: Array.from(selectedCategories),
      apps,
      values: Object.fromEntries(
        Object.entries(forms).map(([k, fg]) => [k, fg.getRawValue()])
      )
    };
  }

  async submit(): Promise<void> {
    const payload = this.buildSubmitPayload();
    console.log('SUBMIT PAYLOAD', payload);
    // TODO: return this.http.post(...).toPromise()
  }

  /** Called by components */
  async updateSelectedCategories() {
    const chosen = this.getChosenCategories();

    // update selection & clear apps
    this._snapshot$.next({
      ...this._snapshot$.value,
      selectedCategories: new Set(chosen),
      apps: []
    });

    // (optional) temporary rebuild so Next button enable state updates
    this.rebuildSteps();

    // now actually load apps and rebuild steps with them
    await this.ensureAppsLoaded();   // <-- important
  }
}
