import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClinicOutcomesState } from './clinic-outcomes.reducer';

export const selectClinicOutcomesState = createFeatureSelector<ClinicOutcomesState>('clinicOutcomes');

export const selectSelectedRange = createSelector(
    selectClinicOutcomesState,
    state => state.selectedRange
);

export const selectClinicData = createSelector(
    selectClinicOutcomesState,
    state => state.data
);

export const selectTimeInRangeChartData = createSelector(
    selectClinicOutcomesState,
    state => state.timeInRangeChartData
);

export const selectGmiChartData = createSelector(
    selectClinicOutcomesState,
    state => state.gmiChartData
);

export const selectAverageGmi = createSelector(
    selectClinicOutcomesState,
    state => state.averageGmi
);
