import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-time-in-range-chart',
  templateUrl: './time-in-range-chart.component.html',
  styleUrls: ['./time-in-range-chart.component.css']
})
export class TimeInRangeChartComponent implements OnChanges, OnDestroy {
  @Input() chartData: ChartConfiguration<'bar'>['data'];
  @Input() chartOptions: ChartConfiguration<'bar'>['options'];
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;

  chart: Chart<'bar'>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartCanvas) {
      if (this.chart) {
        this.chart.data = this.chartData;
        this.chart.options = this.chartOptions;
        this.chart.update();
      } else {
        this.createChart();
      }
    }
  }

  createChart(): void {
    if (this.chartCanvas) {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
