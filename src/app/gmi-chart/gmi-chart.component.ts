import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-gmi-chart',
  templateUrl: './gmi-chart.component.html',
  styleUrls: ['./gmi-chart.component.css']
})
export class GmiChartComponent implements OnChanges, OnDestroy {
  @Input() chartData: ChartConfiguration<'pie'>['data'];
  @Input() chartOptions: ChartConfiguration<'pie'>['options'];
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;

  chart: Chart<'pie'>;

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
        type: 'pie',
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
