import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInRangeChartComponent } from './time-in-range-chart.component';

describe('TimeInRangeChartComponent', () => {
  let component: TimeInRangeChartComponent;
  let fixture: ComponentFixture<TimeInRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeInRangeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
