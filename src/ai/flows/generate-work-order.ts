
'use server';

/**
 * @fileOverview AI agent to generate a Work Order (Surat Perintah Kerja) PDF.
 *
 * - generateWorkOrder - A function that generates the work order PDF.
 * - GenerateWorkOrderInput - The input type for the generateWorkOrder function.
 * - GenerateWorkOrderOutput - The return type for the generateWorkOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PDFDocument, rgb, StandardFonts, PageSizes } from 'pdf-lib';
import * as fs from 'fs/promises';
import * as path from 'path';

const GenerateWorkOrderInputSchema = z.object({
  distributorName: z.string().describe('The name of the distributor company.'),
  distributorAddress: z.string().describe('The address of the distributor company.'),
  distributorLogoUrl: z.string().optional().describe('The URL of the distributor logo (as a data URI).'),
  technicianName: z.string().describe('The name of the assigned technician.'),
  clinicName: z.string().describe('The name of the target clinic.'),
  clinicAddress: z.string().describe('The address of the target clinic.'),
  deviceName: z.string().describe('The name of the device to be serviced.'),
  deviceSerial: z.string().describe('The serial number of the device.'),
  taskDescription: z.string().describe('A description of the task or problem.'),
  deadline: z.string().describe('The deadline for the task (e.g., YYYY-MM-DD).'),
  complexity: z.string().describe('The complexity level of the task.'),
  estimatedDuration: z.string().describe('The estimated duration to complete the task.'),
});
export type GenerateWorkOrderInput = z.infer<typeof GenerateWorkOrderInputSchema>;

const GenerateWorkOrderOutputSchema = z.object({
  workOrder: z.string().describe('The generated Work Order in PDF format (base64 encoded).'),
});
export type GenerateWorkOrderOutput = z.infer<typeof GenerateWorkOrderOutputSchema>;

export async function generateWorkOrder(input: GenerateWorkOrderInput): Promise<GenerateWorkOrderOutput> {
  return generateWorkOrderFlow(input);
}

const generateWorkOrderFlow = ai.defineFlow(
  {
    name: 'generateWorkOrderFlow',
    inputSchema: GenerateWorkOrderInputSchema,
    outputSchema: GenerateWorkOrderOutputSchema,
  },
  async (input) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const leftMargin = 50;
    const rightMargin = width - 50;
    let y = height - 50;

    const drawText = (text: string, x: number, y: number, options: any) => {
        page.drawText(text, { x, y, ...options });
    };

    // Embed Distributor Logo & Address
    if (input.distributorLogoUrl && (input.distributorLogoUrl.startsWith('data:image/png;base64,') || input.distributorLogoUrl.startsWith('data:image/jpeg;base64,'))) {
        try {
            const isPng = input.distributorLogoUrl.startsWith('data:image/png;base64,');
            const base64Data = input.distributorLogoUrl.substring(input.distributorLogoUrl.indexOf(',') + 1);
            const imageBytes = Buffer.from(base64Data, 'base64');
            const image = isPng 
                ? await pdfDoc.embedPng(imageBytes)
                : await pdfDoc.embedJpg(imageBytes);

            const imageDims = image.scale(0.5); // Adjust scale as needed
            page.drawImage(image, {
                x: leftMargin,
                y: y - imageDims.height + 20,
                width: imageDims.width,
                height: imageDims.height,
            });
            
             drawText(input.distributorName, leftMargin + imageDims.width + 10, y, { font: fontBold, size: 14 });
             drawText(input.distributorAddress, leftMargin + imageDims.width + 10, y - 15, { font: font, size: 9, lineHeight: 12, maxWidth: 200 });

        } catch (e) {
            console.error("Could not embed distributor logo:", e);
            drawText(input.distributorName, leftMargin, y, { font: fontBold, size: 14 });
            drawText(input.distributorAddress, leftMargin, y - 15, { font: font, size: 9, lineHeight: 12, maxWidth: 200 });
        }
    } else {
        // Fallback if no logo
        drawText(input.distributorName, leftMargin, y, { font: fontBold, size: 14 });
        drawText(input.distributorAddress, leftMargin, y - 15, { font: font, size: 9, lineHeight: 12, maxWidth: 200 });
    }
    y -= 60;


    // Header Title
    drawText('SURAT PERINTAH KERJA', width / 2 - 100, y, { font: fontBold, size: 20 });
    y -= 20;
    drawText('WORK ORDER', width / 2 - 45, y, { font: fontItalic, size: 14 });
    y -= 20;
    const spkNumber = `No: SPK/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    drawText(spkNumber, width / 2 - (spkNumber.length * 3.5), y, { font, size: 12 });
    y -= 20;


    page.drawLine({
        start: { x: leftMargin, y },
        end: { x: rightMargin, y },
        thickness: 2,
    });
    y -= 30;

    // Content
    const contentLeftMargin = 60;
    const lineHeight = 20;

    const addRow = (label: string, value: string) => {
        const lines = value.split('\n');
        drawText(label, contentLeftMargin, y, { font: font, size: 11 });
        drawText(':', contentLeftMargin + 150, y, { font: font, size: 11 });
        
        let valueY = y;
        for(const line of lines) {
            drawText(line, contentLeftMargin + 160, valueY, { font: fontBold, size: 11, lineHeight: 14 });
            valueY -= 14;
        }
        y -= (lines.length * 14) + (lineHeight - 14);
    };
    
    drawText('Berdasarkan permintaan dari Klien, dengan ini kami menugaskan:', contentLeftMargin, y, { font, size: 11 });
    y -= 30;

    addRow('Nama Teknisi', input.technicianName);
    y -= lineHeight;

    drawText('Untuk melaksanakan pekerjaan maintenance / perbaikan untuk detail sebagai berikut:', contentLeftMargin, y, { font, size: 11 });
    y -= 30;

    addRow('Nama Klien', input.clinicName);
    addRow('Alamat Klinik', input.clinicAddress);
    y -= 5; // extra space
    addRow('Nama Perangkat', input.deviceName);
    addRow('Serial Number', input.deviceSerial);
    y -= 5; // extra space
    addRow('Deskripsi Tugas', input.taskDescription);
    addRow('Deadline', new Date(input.deadline).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }));
    y -= 5; // extra space
    addRow('Tingkat Kerumitan', input.complexity);
    addRow('Estimasi Durasi', input.estimatedDuration);


    y -= 30;
    drawText('Demikian Surat Perintah Kerja ini dibuat untuk dapat dilaksanakan dengan sebaik-baiknya.', contentLeftMargin, y, { font, size: 11 });

    // Signature
    const signatureY = y - 100;
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    drawText(`Jakarta, ${today}`, width - 250, signatureY, { font, size: 12 });
    drawText('Hormat kami,', width - 250, signatureY - 20, { font, size: 12 });
    drawText(input.distributorName, width - 250, signatureY - 80, { font: fontBold, size: 12 });
    drawText('(Manager Operasional)', width - 250, signatureY - 95, { font: fontItalic, size: 10 });
    
    // Footer
    const footerY = 40;
    try {
        const laserLogoPath = path.join(process.cwd(), 'public', 'lashead.png');
        const laserLogoBytes = await fs.readFile(laserLogoPath);
        const laserLogoImage = await pdfDoc.embedPng(laserLogoBytes);
        
        drawText('Powered by:', contentLeftMargin, footerY + 5, { font: fontItalic, size: 8, color: rgb(0.5, 0.5, 0.5) });
        page.drawImage(laserLogoImage, {
            x: contentLeftMargin + 55,
            y: footerY,
            width: 90,
            height: 20,
        });

    } catch (e) {
        console.error("Could not embed LaserTrack logo:", e);
        drawText('Powered by LaserTrack Lite', contentLeftMargin, footerY, { font: fontItalic, size: 8, color: rgb(0.5, 0.5, 0.5) });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { workOrder: pdfBase64 };
  }
);
