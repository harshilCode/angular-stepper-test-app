// core/models/app.models.ts
export type AppCategory = 'web' | 'mobile' | 'desktop' | 'wireframe';

export interface AppItem {
  id: string;          // e.g. "web-1"
  category: AppCategory;
  name: string;        // e.g. "Web 1"
}

export type Audience = 'workforce' | 'client' | 'customer';

export interface AppInfoFormValue {
  name: string;
  description: string;
  url: string;
}

export interface AppAudienceFormValue {
  audience: Audience[]; // multiple checkboxes
}

export interface AudienceWorkforceFormValue {
  q1: string;
  q2: string;
}

export interface AudienceCustomerFormValue {
  q1: string;
  q2: string;
}
