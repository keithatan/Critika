import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubComponent } from './view-sub.component';

describe('ViewSubComponent', () => {
  let component: ViewSubComponent;
  let fixture: ComponentFixture<ViewSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
