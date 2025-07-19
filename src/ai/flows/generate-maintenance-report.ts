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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const GenerateMaintenanceReportInputSchema = z.object({
  technicianName: z.string().describe('The name of the technician.'),
  deviceName: z.string().describe('The name of the device.'),
  statusUpdates: z.string().describe('The status updates provided by the technician, including handling status.'),
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

const reportGenerationPrompt = ai.definePrompt({
  name: 'generateMaintenanceReportPrompt',
  input: {schema: GenerateMaintenanceReportInputSchema},
  output: { schema: z.object({ summary: z.string().describe("A comprehensive summary of the maintenance activities."), recommendations: z.string().describe("Actionable recommendations based on the findings.") }) },
  prompt: `You are an AI assistant specialized in generating maintenance reports for laser devices.
  Your response must be in Indonesian.

  Based on the information provided, generate a concise summary and actionable recommendations.

  Technician Name: {{{technicianName}}}
  Device Name: {{{deviceName}}}
  Status Updates & Handling Status: {{{statusUpdates}}}
  Checklist Results:\n{{{checklistResults}}}
  {{#if additionalNotes}}Additional Notes: {{{additionalNotes}}}{{/if}}
  
  Please provide a professional summary and clear recommendations. Do not include the technician name, device name, or other raw data in your final output. Just the summary and recommendations.
  `,
});


const generateMaintenanceReportFlow = ai.defineFlow(
  {
    name: 'generateMaintenanceReportFlow',
    inputSchema: GenerateMaintenanceReportInputSchema,
    outputSchema: GenerateMaintenanceReportOutputSchema,
  },
  async (input) => {
    // Generate content with AI
    const {output} = await reportGenerationPrompt(input);
    const { summary, recommendations } = output!;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = height - 50;

    // Header
    page.drawText('Laporan Maintenance Perangkat', {
        x: 50,
        y,
        font: fontBold,
        size: 18,
        color: rgb(0.15, 0.15, 0.15),
    });
    y -= 30;

    // Report Details
    const details = [
        { label: 'Nama Perangkat:', value: input.deviceName },
        { label: 'Nama Teknisi:', value: input.technicianName },
        { label: 'Tanggal:', value: new Date().toLocaleDateString('id-ID') },
    ];
    
    details.forEach(detail => {
        page.drawText(detail.label, { x: 50, y, font: fontBold, size: 12 });
        page.drawText(detail.value, { x: 180, y, font, size: 12 });
        y -= 20;
    });
    y -= 10;
    
    // Status
    page.drawText('Pembaruan Status & Penanganan', { x: 50, y, font: fontBold, size: 14 });
    y -= 20;
    page.drawText(input.statusUpdates, { x: 50, y, font, size: 11, lineHeight: 15, maxWidth: width - 100 });
    y -= (input.statusUpdates.split('\n').length * 15) + 20;

    // Checklist
    page.drawText('Hasil Checklist', { x: 50, y, font: fontBold, size: 14 });
    y -= 20;
    page.drawText(input.checklistResults, { x: 50, y, font, size: 11, lineHeight: 15, maxWidth: width - 100 });
    y -= (input.checklistResults.split('\n').length * 15) + 20;
    
    // Summary
    page.drawText('Ringkasan', { x: 50, y, font: fontBold, size: 14 });
    y -= 20;
    page.drawText(summary, { x: 50, y, font, size: 11, lineHeight: 15, maxWidth: width - 100 });
    y -= (Math.ceil(summary.length / 80) * 15) + 20;

    // Recommendations
    page.drawText('Rekomendasi', { x: 50, y, font: fontBold, size: 14 });
    y -= 20;
    page.drawText(recommendations, { x: 50, y, font, size: 11, lineHeight: 15, maxWidth: width - 100 });
    y -= (Math.ceil(recommendations.length / 80) * 15) + 20;

    // Additional Notes
    if(input.additionalNotes) {
      page.drawText('Catatan Tambahan', { x: 50, y, font: fontBold, size: 14 });
      y -= 20;
      page.drawText(input.additionalNotes, { x: 50, y, font, size: 11, lineHeight: 15, maxWidth: width - 100 });
      y -= (Math.ceil(input.additionalNotes.length / 80) * 15) + 20;
    }

    // Embed photos
    if (input.photosDataUri.length > 0) {
        y -= 20;
        page.drawText('Foto Lampiran', { x: 50, y, font: fontBold, size: 14 });
        y -= 20;

        let x = 50;
        for (const dataUri of input.photosDataUri) {
            try {
                const imageBytes = dataUri.startsWith('data:image/jpeg;base64,') 
                    ? Buffer.from(dataUri.substring('data:image/jpeg;base64,'.length), 'base64')
                    : Buffer.from(dataUri.substring('data:image/png;base64,'.length), 'base64');
                
                const image = dataUri.startsWith('data:image/jpeg;base64,')
                    ? await pdfDoc.embedJpg(imageBytes)
                    : await pdfDoc.embedPng(imageBytes);

                if (y < 150) { // Check if space is enough
                    page = pdfDoc.addPage();
                    y = height - 50;
                }

                page.drawImage(image, { x, y: y - 100, width: 120, height: 120 });
                x += 140;
                if (x > width - 150) {
                    x = 50;
                    y -= 140;
                }
            } catch (e) {
                console.error("Error embedding image in PDF", e);
            }
        }
    }


    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { report: pdfBase64 };
  }
);
