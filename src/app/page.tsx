
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { ArrowRight, Bot, FileText, MapPin } from 'lucide-react';
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
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" >
           <Image
            src="https://placehold.co/1200x800"
            alt="Laser device"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="laser device technology"
           />
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

        <section className="py-12 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Fitur Unggulan Kami</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <MapPin className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Monitoring Real-time</h3>
                        <p className="text-muted-foreground">Lacak lokasi teknisi, status perangkat, dan progres penanganan secara langsung melalui peta interaktif.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Manajemen Terpusat</h3>
                        <p className="text-muted-foreground">Kelola semua lisensi, akun distributor, jadwal teknisi, dan riwayat maintenance dalam satu platform.</p>
                    </div>
                     <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                           <Bot className="w-8 h-8 text-primary" />
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
