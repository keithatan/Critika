import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFeedbackComponent } from './rate-feedback.component';

describe('RateFeedbackComponent', () => {
  let component: RateFeedbackComponent;
  let fixture: ComponentFixture<RateFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
