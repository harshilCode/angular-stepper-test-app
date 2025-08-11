// core/services/apps.api.ts
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { AppCategory, AppItem } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class AppsApi {
  // Mock backend based on selected categories
  fetchApps(selected: AppCategory[]) {
    // Example payload per your brief:
    // web -> 3 items, mobile -> 2 items
    const items: AppItem[] = [];
    if (selected.includes('web')) {
      items.push(
        { id: 'web-1', category: 'web', name: 'Web 1' },
        { id: 'web-2', category: 'web', name: 'Web 2' },
        { id: 'web-3', category: 'web', name: 'Web 3' },
      );
    }
    if (selected.includes('mobile')) {
      items.push(
        { id: 'mobile-1', category: 'mobile', name: 'Mobile 1' },
        { id: 'mobile-2', category: 'mobile', name: 'Mobile 2' },
      );
    }
    // desktop/wireframe can be added similarly
    return of(items).pipe(delay(250)); // simulate network
  }
}
