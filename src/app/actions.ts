'use server';

import { generateMaintenanceReport } from '@/ai/flows/generate-maintenance-report';
import type { GenerateMaintenanceReportInput, GenerateMaintenanceReportOutput } from '@/ai/flows/generate-maintenance-report';

export async function generateReportAction(input: GenerateMaintenanceReportInput): Promise<GenerateMaintenanceReportOutput | null> {
    try {
        const result = await generateMaintenanceReport(input);
        return result;
    } catch (error) {
        console.error('Error generating report:', error);
        return null;
    }
}
