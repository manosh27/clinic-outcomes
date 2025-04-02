import { createAction, props } from '@ngrx/store';
import { ClinicData } from '../mock-data.service';

export const updateSelectedRange = createAction(
    '[Clinic Outcomes] Update Selected Range',
    props<{ range: number }>()
);

export const loadClinicOutcomesSuccess = createAction(
    '[Clinic Outcomes] Load Clinic Outcomes Success',
    props<{
        data: ClinicData,
        timeInRangeChartData: any,
        gmiChartData: any,
        averageGmi: number
    }>()
);
