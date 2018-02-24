import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdashboardComponent } from './fdashboard.component';

describe('FdashboardComponent', () => {
  let component: FdashboardComponent;
  let fixture: ComponentFixture<FdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
