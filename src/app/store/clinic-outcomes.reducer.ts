import { createReducer, on } from '@ngrx/store';
import * as ClinicActions from './clinic-outcomes.actions';
import { ClinicData } from '../mock-data.service';

export interface ClinicOutcomesState {
    selectedRange: number;
    data: ClinicData | null;
    timeInRangeChartData: any;
    gmiChartData: any;
    averageGmi: number;
}

export const initialState: ClinicOutcomesState = {
    selectedRange: 30,
    data: null,
    timeInRangeChartData: null,
    gmiChartData: null,
    averageGmi: 0,
};

export const clinicOutcomesReducer = createReducer(
    initialState,
    on(ClinicActions.updateSelectedRange, (state, { range }) => ({
        ...state,
        selectedRange: range
    })),
    on(ClinicActions.loadClinicOutcomesSuccess, (state, { data, timeInRangeChartData, gmiChartData, averageGmi }) => ({
        ...state,
        data,
        timeInRangeChartData,
        gmiChartData,
        averageGmi
    }))
);
