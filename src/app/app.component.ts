import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js/auto';
import { MockDataService, ClinicData } from './mock-data.service';
import * as ClinicActions from './store/clinic-outcomes.actions';
import { ClinicOutcomesState } from './store/clinic-outcomes.reducer';
import { select, Store } from '@ngrx/store';
import { selectSelectedRange } from './store/clinic-outcomes.selectors';

// Register the datalabels plugin globally
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ClinicOutcomes';

  // UI display values
  selectedRange = 30;
  showingPatients = 0;
  dateRangeText = '';
  lastUpdated = '';

  // Time in Range Chart (bar chart with 5 segments)
  timeInRangeChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Time in Range'],
    datasets: []
  };
  timeInRangeChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'x',
    scales: {
      x: {
        stacked: true,
        display: false
      },
      y: {
        stacked: true,
        display: false
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        position: 'nearest',
        callbacks: {
          label: (ctx) => {
            // Prefer ctx.parsed.y for vertical bars; if not available, use ctx.parsed.x
            const value = ctx.parsed.y !== undefined ? ctx.parsed.y : ctx.parsed.x;
            return `${ctx.dataset.label}: ${value}%`;
          }
        }
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value: number) => `${value}%`
      }
    }
  };

  // GMI Chart (pie chart)
  gmiChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Below Range', 'In Range', 'Above Range'],
    datasets: []
  };
  gmiChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { display: false, position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || '';
            const value = ctx.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value: number) => `${value}%`
      }
    }
  };

  averageGmi = 0;

  constructor(private mockDataService: MockDataService,
              private store: Store<{ clinicOutcomes: ClinicOutcomesState }>) {
    this.store.pipe(select(selectSelectedRange)).subscribe(range => {
      console.log( `Selected range from store: ${range}`); // Debug log to check the selected range
    });
  }

  ngOnInit(): void {
    // Load 30-day data on app load
    this.loadData(this.selectedRange);

    this.store.select('clinicOutcomes').subscribe(state => {
      console.log('Current Clinic Outcomes state:', state);
    });
  }

  ngAfterViewInit() {
    // Ensure the charts are fully initialized after the view is loaded
    this.loadData(this.selectedRange);

  }

  loadData(range: number): void {
    this.selectedRange = range;
    const data: ClinicData = this.mockDataService.getDataForRange(range);

    // Update local UI values
    this.showingPatients = data.patients;
    this.dateRangeText = data.dateRange;
    this.lastUpdated = data.lastUpdated;

    // Populate the Time in Range bar chart with 5 datasets
    this.timeInRangeChartData = {
      labels: ['Time in Range'],
      datasets: [
        {
          label: '40-54',
          data: [data.range40_54],
          backgroundColor: '#F44336',
          stack: '1',
        },
        {
          label: '54-70',
          data: [data.range54_70],
          backgroundColor: '#FF9800',
          stack: '1',
        },
        {
          label: '70-180',
          data: [data.range70_180],
          backgroundColor: '#4CAF50',
          stack: '1',
        },
        {
          label: '180-240',
          data: [data.range180_240],
          backgroundColor: '#2196F3',
          stack: '1',
        },
        {
          label: '240-400',
          data: [data.range240_400],
          backgroundColor: '#9C27B0',
          stack: '1',
        },
      ]
    };

    // Populate the GMI pie chart
    this.gmiChartData = {
      labels: ['Below Range', 'In Range', 'Above Range'],
      datasets: [
        {
          data: [data.gmiBelow, data.gmiInRange, data.gmiAbove],
          backgroundColor: ['#F4694D', '#5DBB5B', '#F8B76C']
        }
      ]
    };

    this.averageGmi = data.averageGmi;

    // Dispatch actions to update the store with the new state
    this.store.dispatch(ClinicActions.updateSelectedRange({ range }));
    this.store.dispatch(ClinicActions.loadClinicOutcomesSuccess({
      data,
      timeInRangeChartData: this.timeInRangeChartData,
      gmiChartData: this.gmiChartData,
      averageGmi: this.averageGmi
    }));
  }

  printPage(): void {
    window.print();
  }
}
