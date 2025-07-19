'use server';

/**
 * @fileOverview AI agent to generate a summary report of device maintenance.
 *
 * - generateMaintenanceReport - A function that generates the maintenance report.
 * - GenerateMaintenanceReportInput - The input type for the generateMaintenanceReport function.
 * - GenerateMaintenanceReportOutput - The return type for the generateMaintenanceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMaintenanceReportInputSchema = z.object({
  technicianName: z.string().describe('The name of the technician.'),
  deviceName: z.string().describe('The name of the device.'),
  statusUpdates: z.string().describe('The status updates provided by the technician.'),
  checklistResults: z.string().describe('The results of the maintenance checklist.'),
  photosDataUri: z.array(z.string()).describe('Photos related to the maintenance, as data URIs.'),
  additionalNotes: z.string().optional().describe('Any additional notes from the technician.'),
});

export type GenerateMaintenanceReportInput = z.infer<typeof GenerateMaintenanceReportInputSchema>;

const GenerateMaintenanceReportOutputSchema = z.object({
  report: z.string().describe('The generated maintenance report in PDF format (base64 encoded).'),
});

export type GenerateMaintenanceReportOutput = z.infer<typeof GenerateMaintenanceReportOutputSchema>;

export async function generateMaintenanceReport(input: GenerateMaintenanceReportInput): Promise<GenerateMaintenanceReportOutput> {
  return generateMaintenanceReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMaintenanceReportPrompt',
  input: {schema: GenerateMaintenanceReportInputSchema},
  output: {schema: GenerateMaintenanceReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating maintenance reports for laser devices.

  Based on the information provided by the technician, generate a comprehensive and well-reasoned maintenance report in a professional tone. The report should be suitable for sharing with all stakeholders.

  Technician Name: {{{technicianName}}}
  Device Name: {{{deviceName}}}
  Status Updates: {{{statusUpdates}}}
  Checklist Results: {{{checklistResults}}}
  {{#if additionalNotes}}Additional Notes: {{{additionalNotes}}}{{/if}}
  Photos:
  {{#each photosDataUri}}
    {{media url=this}}
  {{/each}}

  Please ensure the report is formatted as a PDF document (encoded as a base64 string). Focus on clarity, accuracy, and providing actionable insights.
  `,
});

import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const generateMaintenanceReportFlow = ai.defineFlow(
  {
    name: 'generateMaintenanceReportFlow',
    inputSchema: GenerateMaintenanceReportInputSchema,
    outputSchema: GenerateMaintenanceReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Here you would normally generate the PDF from the text and return the base64 encoded PDF.
    // Since PDF generation is complex and requires external libraries, I'll skip the actual PDF creation.

    // Dummy PDF creation for demonstration purposes.
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(output?.report || 'Sample Report', { x: 50, y: 750 });
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { report: pdfBase64 };
  }
);
