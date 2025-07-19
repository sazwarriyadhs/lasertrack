
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

const GenerateWorkOrderInputSchema = z.object({
  distributorName: z.string().describe('The name of the distributor company.'),
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

    const drawText = (text: string, x: number, y: number, options: any) => {
        page.drawText(text, { x, y, ...options });
    };

    // Header
    drawText('SURAT PERINTAH KERJA', width / 2 - 100, height - 50, { font: fontBold, size: 20 });
    drawText('WORK ORDER', width / 2 - 45, height - 70, { font: fontItalic, size: 14 });
    const spkNumber = `No: SPK/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    drawText(spkNumber, width / 2 - (spkNumber.length * 3.5), height - 90, { font, size: 12 });

    page.drawLine({
        start: { x: 50, y: height - 110 },
        end: { x: width - 50, y: height - 110 },
        thickness: 2,
    });

    // Content
    let y = height - 140;
    const leftMargin = 60;
    const rightMargin = 300;
    const lineHeight = 20;

    const addRow = (label: string, value: string) => {
        const lines = value.split('\n');
        drawText(label, leftMargin, y, { font: font, size: 11 });
        drawText(':', leftMargin + 150, y, { font: font, size: 11 });
        
        let valueY = y;
        for(const line of lines) {
            drawText(line, leftMargin + 160, valueY, { font: fontBold, size: 11, lineHeight: 14 });
            valueY -= 14;
        }
        y -= (lines.length * 14) + (lineHeight - 14);
    };
    
    drawText('Berdasarkan permintaan dari Klien, dengan ini kami menugaskan:', leftMargin, y, { font, size: 11 });
    y -= 30;

    addRow('Nama Teknisi', input.technicianName);
    y -= lineHeight;

    drawText('Untuk melaksanakan pekerjaan maintenance / perbaikan untuk detail sebagai berikut:', leftMargin, y, { font, size: 11 });
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
    drawText('Demikian Surat Perintah Kerja ini dibuat untuk dapat dilaksanakan dengan sebaik-baiknya.', leftMargin, y, { font, size: 11 });

    // Signature
    const signatureY = y - 100;
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    drawText(`Jakarta, ${today}`, width - 250, signatureY, { font, size: 12 });
    drawText('Hormat kami,', width - 250, signatureY - 20, { font, size: 12 });
    drawText(input.distributorName, width - 250, signatureY - 80, { font: fontBold, size: 12 });
    drawText('(Manager Operasional)', width - 250, signatureY - 95, { font: fontItalic, size: 10 });


    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { workOrder: pdfBase64 };
  }
);
