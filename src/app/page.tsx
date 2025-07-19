
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-8 border-b bg-card">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login/distributor">Login Distributor</Link>
          </Button>
          <Button asChild>
            <Link href="/login/superadmin">Login Super Admin</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1200x800/1E293B/FFFFFF?text=.')" }}>
           <div className="absolute inset-0 bg-black/50" />
           <div className="relative z-10 p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">SERENITY LaserTrack</h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Solusi Terintegrasi untuk Manajemen, Monitoring, dan Maintenance Perangkat Laser Anda.</p>
                <div className="mt-8 flex justify-center gap-4">
                     <Button size="lg" asChild>
                        <Link href="/login/distributor">Mulai Sebagai Distributor <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
           </div>
        </section>

        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Fitur Unggulan Kami</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Monitoring Real-time</h3>
                        <p className="text-muted-foreground">Lacak lokasi teknisi, status perangkat, dan progres penanganan secara langsung melalui peta interaktif.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-primary"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Manajemen Terpusat</h3>
                        <p className="text-muted-foreground">Kelola semua lisensi, akun distributor, jadwal teknisi, dan riwayat maintenance dalam satu platform.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Laporan Otomatis</h3>
                        <p className="text-muted-foreground">Hasilkan Surat Perintah Kerja (SPK) dan laporan maintenance PDF secara otomatis dengan bantuan AI.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SERENITY LaserTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
