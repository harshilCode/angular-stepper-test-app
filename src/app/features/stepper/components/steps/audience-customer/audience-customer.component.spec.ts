import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceCustomerComponent } from './audience-customer.component';

describe('AudienceCustomerComponent', () => {
  let component: AudienceCustomerComponent;
  let fixture: ComponentFixture<AudienceCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienceCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudienceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
