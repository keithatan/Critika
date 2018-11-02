import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendCoinsComponent } from './spend-coins.component';

describe('SpendCoinsComponent', () => {
  let component: SpendCoinsComponent;
  let fixture: ComponentFixture<SpendCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
