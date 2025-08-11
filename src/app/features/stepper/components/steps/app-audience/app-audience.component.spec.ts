import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAudienceComponent } from './app-audience.component';

describe('AppAudienceComponent', () => {
  let component: AppAudienceComponent;
  let fixture: ComponentFixture<AppAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAudienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
