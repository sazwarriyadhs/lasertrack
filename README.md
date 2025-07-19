# LaserTrack Lite: Platform Manajemen Terpadu untuk Industri Estetika

Selamat datang di LaserTrack Lite, sebuah platform web modern yang dirancang untuk merevolusi cara distributor, klinik, dan teknisi di industri estetika medis berkolaborasi dan mengelola operasional harian. Aplikasi ini menyediakan serangkaian alat canggih untuk pelacakan perangkat, manajemen tim, penjadwalan servis, dan komunikasi real-time, semuanya dalam satu dasbor terpusat.

## Ringkasan Fitur Utama

- **Dasbor Berbasis Peran**: Antarmuka yang disesuaikan untuk setiap peran: Super Admin, Distributor, Klinik, dan Teknisi.
- **Manajemen Geospasial**: Visualisasi lokasi distributor, klinik, dan teknisi di peta interaktif untuk pelacakan dan penugasan yang efisien.
- **Siklus Hidup Perangkat**: Pantau status setiap perangkat laser dari instalasi, maintenance, hingga penonaktifan.
- **Otomatisasi Dokumen**: Hasilkan Surat Perintah Kerja (SPK) dan Laporan Maintenance dalam format PDF secara otomatis dengan bantuan AI.
- **Portal Teknisi Mobile-First**: Dasbor yang dioptimalkan untuk teknisi lapangan, memungkinkan mereka melihat tugas, mengisi checklist, dan mengunggah laporan langsung dari perangkat seluler.
- **Komunikasi Terpusat**: Fitur chat terintegrasi untuk komunikasi yang lancar antara distributor, klinik, dan teknisi.

## Tech Stack

Proyek ini dibangun menggunakan tumpukan teknologi modern yang memastikan skalabilitas, kinerja, dan pengalaman pengembang yang luar biasa.

- **Frontend**: Next.js (App Router), React, TypeScript
- **UI Framework**: ShadCN UI, Tailwind CSS
- **Kecerdasan Buatan (AI)**: Google AI & Genkit untuk pembuatan laporan dan SPK.
- **Manajemen State**: React Context API
- **Formulir**: React Hook Form dengan Zod untuk validasi skema.
- **Pustaka PDF**: `pdf-lib` untuk pembuatan dokumen PDF di sisi server.
- **Peta**: OpenLayers untuk tampilan peta yang interaktif.

## Struktur Proyek

```
/
├── src/
│   ├── app/                # Halaman dan routing Next.js (App Router)
│   │   ├── (auth)/         # Halaman login untuk berbagai peran
│   │   ├── dashboard/      # Layout dan halaman dasbor utama
│   │   └── ...
│   ├── ai/                 # Alur kerja Genkit untuk fitur AI
│   │   ├── flows/
│   │   └── genkit.ts
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── dashboards/
│   │   ├── layout/
│   │   └── ui/             # Komponen dari ShadCN UI
│   ├── context/            # Global state management (App Context)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilitas, data dummy, dan definisi tipe
│   └── public/             # Aset statis (gambar, logo)
├── tailwind.config.ts      # Konfigurasi Tailwind CSS
└── next.config.ts          # Konfigurasi Next.js
```

## Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Prasyarat**: Pastikan Anda memiliki Node.js (v18 atau lebih baru) dan npm terinstal.

2.  **Clone Repositori**:
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd [NAMA_DIREKTORI]
    ```

3.  **Instal Dependensi**:
    ```bash
    npm install
    ```

4.  **Konfigurasi Variabel Lingkungan**:
    Buat file `.env.local` di root proyek dan tambahkan variabel yang diperlukan, seperti kunci API untuk Google AI.
    ```env
    GEMINI_API_KEY=AIzaSy...
    ```

5.  **Jalankan Aplikasi Development**:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:9002`.

6.  **Login & Eksplorasi**:
    Buka aplikasi di browser Anda dan gunakan kredensial dummy yang tersedia di `src/lib/data.ts` untuk masuk sebagai berbagai peran dan menjelajahi fitur-fiturnya.

    - **Distributor**: `distributor@lasertrack.com`
    - **Klinik**: `clinic@lasertrack.com`
    - **Teknisi**: `tech@lasertrack.com`
    - **Super Admin**: `superadmin@lasertrack.com`

    Password default untuk semua akun adalah `password`.
