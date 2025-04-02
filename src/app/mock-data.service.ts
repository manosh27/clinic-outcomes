import { Injectable } from '@angular/core';

export interface ClinicData {
    patients: number;
    dateRange: string;
    lastUpdated: string;
    // Five ranges for the Time in Range stacked bar (sum to 100)
    range40_54: number;
    range54_70: number;
    range70_180: number;
    range180_240: number;
    range240_400: number;
    // GMI pie chart data (sum to 100)
    gmiBelow: number;
    gmiInRange: number;
    gmiAbove: number;
    averageGmi: number;
}

@Injectable({
    providedIn: 'root'
})
export class MockDataService {
    constructor() { }

    getDataForRange(days: number): ClinicData {
        const now = new Date().toLocaleString();
        if (days === 30) {
            return {
                patients: 150,
                dateRange: '01/01/2024 - 01/30/2024',
                lastUpdated: now,
                range40_54: 10,
                range54_70: 15,
                range70_180: 50,
                range180_240: 15,
                range240_400: 10,
                gmiBelow: 20,
                gmiInRange: 65,
                gmiAbove: 15,
                averageGmi: 7.1
            };
        } else if (days === 60) {
            return {
                patients: 200,
                dateRange: '12/02/2023 - 01/30/2024',
                lastUpdated: now,
                range40_54: 12,
                range54_70: 13,
                range70_180: 52,
                range180_240: 15,
                range240_400: 8,
                gmiBelow: 18,
                gmiInRange: 70,
                gmiAbove: 12,
                averageGmi: 7.3
            };
        } else {
            // 90 days
            return {
                patients: 250,
                dateRange: '11/01/2023 - 01/30/2024',
                lastUpdated: now,
                range40_54: 8,
                range54_70: 17,
                range70_180: 55,
                range180_240: 10,
                range240_400: 10,
                gmiBelow: 22,
                gmiInRange: 66,
                gmiAbove: 12,
                averageGmi: 7.4
            };
        }
    }
}
