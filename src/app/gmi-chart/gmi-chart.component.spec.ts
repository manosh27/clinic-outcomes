import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmiChartComponent } from './gmi-chart.component';

describe('GmiChartComponent', () => {
  let component: GmiChartComponent;
  let fixture: ComponentFixture<GmiChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmiChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
