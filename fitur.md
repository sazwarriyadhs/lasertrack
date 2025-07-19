# Rincian Fitur Aplikasi LaserTrack Lite

Dokumen ini merinci semua fitur utama yang tersedia di platform LaserTrack Lite, dikategorikan berdasarkan peran pengguna.

---

## Ⅰ. Fitur Umum (Tersedia untuk Beberapa Peran)

- **Login Berbasis Peran**: Sistem otentikasi aman yang mengarahkan pengguna ke dasbor yang sesuai.
- **Dasbor Responsif**: Antarmuka pengguna yang dirancang untuk bekerja dengan baik di desktop maupun perangkat mobile.
- **Manajemen Profil**: Pengguna dapat memperbarui informasi pribadi mereka, termasuk nama, kontak, dan foto profil.
- **Notifikasi Real-time**: Sistem notifikasi untuk pembaruan penting (misalnya, tugas baru, status perubahan).
- **Pusat Pesan (Chat)**: Fitur chat terintegrasi untuk komunikasi langsung dan terdokumentasi antar peran yang relevan.

---

## Ⅱ. Portal Super Admin

Super Admin memiliki akses tertinggi untuk mengelola ekosistem distributor.

- **Peta Distributor**:
  - Tampilan geospasial dari semua distributor yang terdaftar.
  - Popup interaktif pada peta yang menampilkan detail singkat distributor.
- **Manajemen Distributor**:
  - Menambah, mengedit, dan menghapus data distributor.
  - Mengelola status lisensi aplikasi (Aktif, Tidak Aktif, Kadaluarsa).
  - Melacak informasi penting seperti sisa durasi lisensi dan login terakhir.
- **Pencarian & Filter**:
  - Kemampuan untuk mencari distributor berdasarkan nama.
  - Filter untuk menampilkan distributor berdasarkan status lisensi.
- **Chat dengan Distributor**:
  - Berkomunikasi langsung dengan setiap perusahaan distributor.

---

## Ⅲ. Portal Distributor

Distributor adalah pengguna utama platform, dengan alat untuk mengelola seluruh jaringan layanan mereka.

- **Dasbor Utama (Peta Klinik)**:
  - Visualisasi lokasi semua klinik yang dikelola di peta.
  - Filter peta berdasarkan status perangkat di klinik (misalnya, tampilkan hanya klinik yang memiliki alat "Butuh Perhatian").
- **Manajemen Klinik**:
  - Menambah, mengedit, dan menghapus data klinik.
  - Melihat status agregat perangkat di setiap klinik.
- **Manajemen Teknisi**:
  - Menambah, mengedit, dan menghapus profil teknisi.
  - Tautan ke halaman detail profil publik untuk setiap teknisi.
- **Pelacakan Teknisi**:
  - Peta real-time yang menunjukkan lokasi dan status tugas semua teknisi (Dalam Perjalanan, Menangani, Selesai, Standby).
- **Monitoring Perangkat**:
  - Daftar terpusat dari semua perangkat di seluruh klinik.
  - Pencarian dan filter berdasarkan status, model, atau klinik.
- **Pembuatan Surat Perintah Kerja (SPK)**:
  - Formulir untuk membuat SPK baru untuk teknisi.
  - **Otomatisasi PDF**: Menghasilkan dokumen SPK dalam format PDF secara otomatis setelah formulir dikirim.
  - PDF yang dihasilkan mencakup nomor SPK unik, detail tugas, tingkat kerumitan, dan estimasi durasi.
- **Laporan & Analitik**:
  - Laporan aktivitas tim teknisi.
  - Grafik penggunaan aplikasi oleh klinik.
- **Chat Terintegrasi**:
  - Saluran komunikasi terpisah untuk setiap klinik dan teknisi.

---

## Ⅳ. Portal Teknisi (Mobile-First)

Dirancang untuk efisiensi di lapangan, portal ini memberikan semua yang dibutuhkan teknisi.

- **Halaman Login Khusus**: Halaman login yang bersih dan mudah digunakan di perangkat mobile.
- **Dasbor Harian**:
  - Tampilan ringkas berisi jumlah kunjungan terjadwal, alat yang butuh perhatian, dan notifikasi baru.
  - Menu navigasi berbasis ikon untuk akses cepat ke fitur-fitur utama.
- **Daftar Perangkat**:
  - Melihat semua perangkat yang relevan dari distributor mereka.
  - Filter berdasarkan klinik atau status untuk menemukan perangkat dengan cepat.
- **Halaman Detail Perangkat & Laporan**:
  - Tautan dari daftar perangkat ke halaman maintenance.
  - **Formulir Laporan Digital**: Mengisi laporan servis langsung dari lapangan.
    - **Checklist Interaktif**: Menandai item pemeriksaan standar.
    - **Unggah Foto**: Melampirkan bukti visual dari pekerjaan yang dilakukan.
    - **Pembaruan Status**: Mengatur status penanganan (Dalam Perjalanan, Menangani, Selesai).
    - **Pembuatan Laporan PDF Otomatis**: Setelah formulir dikirim, sistem secara otomatis menghasilkan laporan PDF yang komprehensif.
- **Profil Teknisi Publik**:
  - Halaman detail yang dapat diakses oleh distributor, menampilkan informasi kontak dan status tugas teknisi.

---

## Ⅴ. Portal Klinik

Portal sederhana yang dirancang agar klinik dapat mengelola aset dan layanan mereka dengan mudah.

- **Dasbor Klinik**:
  - Ringkasan semua perangkat yang dimiliki, beserta statusnya (Operasional, Dalam Perbaikan, dll.).
  - Kartu status teknisi aktif yang sedang menangani perangkat mereka.
- **Permintaan Layanan**:
  - Formulir sederhana untuk melaporkan masalah atau meminta jadwal maintenance.
- **Riwayat Maintenance**:
  - Daftar semua pekerjaan servis yang telah dilakukan pada perangkat mereka.
  - Akses untuk melihat laporan PDF dari setiap pekerjaan.
- **Informasi Kontak**:
  - Akses mudah ke informasi kontak distributor dan teknisi yang relevan.
