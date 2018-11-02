import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQueueComponent } from './my-queue.component';

describe('MyQueueComponent', () => {
  let component: MyQueueComponent;
  let fixture: ComponentFixture<MyQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
