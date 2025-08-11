import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectApplicationTypeComponent } from './select-application-type.component';

describe('SelectApplicationTypeComponent', () => {
  let component: SelectApplicationTypeComponent;
  let fixture: ComponentFixture<SelectApplicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectApplicationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectApplicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
