
'use server';

import { generateMaintenanceReport } from '@/ai/flows/generate-maintenance-report';
import type { GenerateMaintenanceReportInput, GenerateMaintenanceReportOutput } from '@/ai/flows/generate-maintenance-report';
import { generateWorkOrder } from '@/ai/flows/generate-work-order';
import type { GenerateWorkOrderInput, GenerateWorkOrderOutput } from '@/ai/flows/generate-work-order';


export async function generateReportAction(input: GenerateMaintenanceReportInput): Promise<GenerateMaintenanceReportOutput | null> {
    try {
        const result = await generateMaintenanceReport(input);
        return result;
    } catch (error) {
        console.error('Error generating report:', error);
        return null;
    }
}

export async function generateWorkOrderAction(input: GenerateWorkOrderInput): Promise<GenerateWorkOrderOutput | null> {
    try {
        const result = await generateWorkOrder(input);
        return result;
    } catch (error) {
        console.error('Error generating work order:', error);
        return null;
    }
}
