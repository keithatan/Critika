import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubComponent } from './edit-sub.component';

describe('EditSubComponent', () => {
  let component: EditSubComponent;
  let fixture: ComponentFixture<EditSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
