import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgChartsModule } from 'ng2-charts';

import { MockDataService } from './mock-data.service';
import {TimeInRangeChartComponent} from "./time-in-range-chart/time-in-range-chart.component";
import {GmiChartComponent} from "./gmi-chart/gmi-chart.component";
import {clinicOutcomesReducer} from "./store/clinic-outcomes.reducer";

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, StoreModule.forRoot({ clinicOutcomes: clinicOutcomesReducer }), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), MatToolbarModule, MatCardModule, MatGridListModule, MatButtonModule, MatIconModule, NgChartsModule, MatTooltipModule],
  declarations: [AppComponent, TimeInRangeChartComponent, GmiChartComponent],
  providers: [MockDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
