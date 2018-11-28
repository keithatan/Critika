import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackViewComponent } from './feedback-view.component';

describe('FeedbackViewComponent', () => {
  let component: FeedbackViewComponent;
  let fixture: ComponentFixture<FeedbackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
