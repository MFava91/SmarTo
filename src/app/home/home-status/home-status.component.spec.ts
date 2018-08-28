import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStatusComponent } from './home-status.component';

describe('HomeStatusComponent', () => {
  let component: HomeStatusComponent;
  let fixture: ComponentFixture<HomeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
