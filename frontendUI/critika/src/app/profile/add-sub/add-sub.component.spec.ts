import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubComponent } from './add-sub.component';

describe('AddSubComponent', () => {
  let component: AddSubComponent;
  let fixture: ComponentFixture<AddSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
