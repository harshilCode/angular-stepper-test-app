import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceWorkforceComponent } from './audience-workforce.component';

describe('AudienceWorkforceComponent', () => {
  let component: AudienceWorkforceComponent;
  let fixture: ComponentFixture<AudienceWorkforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienceWorkforceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudienceWorkforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
