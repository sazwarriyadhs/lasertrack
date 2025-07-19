'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/layout/logo';
import { ArrowRight, Briefcase, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const newsItems = [
    {
        role: 'Super Admin',
        title: 'Platform Analytics Terbaru untuk Manajemen Distributor',
        description: 'Update terbaru kami menghadirkan dashboard analitik canggih untuk memantau kinerja distributor secara real-time.',
        link: '#',
    },
    {
        role: 'Distributor',
        title: 'Teknologi Laser Dioda Generasi Berikutnya Telah Hadir',
        description: 'Temukan inovasi terbaru dalam teknologi laser dioda yang menawarkan efisiensi lebih tinggi dan kenyamanan pasien.',
        link: '#',
    },
     {
        role: 'Super Admin',
        title: 'Peningkatan Keamanan: Otentikasi Multi-Faktor (MFA)',
        description: 'Kami telah meluncurkan MFA untuk semua akun Super Admin, menambahkan lapisan keamanan ekstra untuk melindungi data Anda.',
        link: '#',
    },
    {
        role: 'Distributor',
        title: 'Pelatihan Sertifikasi Online untuk Teknisi Anda',
        description: 'Program pelatihan online baru kami kini tersedia untuk memastikan teknisi Anda selalu update dengan teknologi terkini.',
        link: '#',
    },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Logo />
        <div className='flex items-center gap-2'>
            <Button variant="ghost" asChild><Link href="/partner/login">Distributor Login</Link></Button>
            <Button asChild><Link href="/adminlogon">Super Admin Login</Link></Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Platform Manajemen Terpadu untuk Industri Estetika
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    LaserTrack Lite memberdayakan Super Admin untuk mengelola jaringan distributor dan memungkinkan distributor untuk mengoptimalkan layanan ke klinik mereka.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/partner/login">Mulai sebagai Distributor</Link>
                  </Button>
                   <Button asChild variant="outline" size="lg">
                    <Link href="/adminlogon">Akses Super Admin</Link>
                  </Button>
                </div>
              </div>
               <Image
                    src="https://placehold.co/600x400.png"
                    width="600"
                    height="400"
                    alt="Hero"
                    data-ai-hint="aesthetic laser device"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
            </div>
          </div>
        </section>

        <section id="roles" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Disesuaikan untuk Peran Anda</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           Pilih jalur yang sesuai dengan tanggung jawab Anda dan akses alat yang Anda butuhkan untuk sukses.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none mt-12">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className='flex items-center gap-4'>
                                <Users className='w-8 h-8 text-primary' />
                                <CardTitle className='text-2xl'>Untuk Super Admin</CardTitle>
                            </div>
                             <CardDescription>Kelola seluruh ekosistem dari satu tempat.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1'>
                           <p>Pantau dan kelola semua akun distributor, lisensi aplikasi, dan lihat gambaran umum jaringan secara nasional. Alat administratif yang kuat di ujung jari Anda.</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href="/adminlogon">Login sebagai Super Admin <ArrowRight className='ml-2' /></Link>
                            </Button>
                        </div>
                    </Card>
                     <Card className="flex flex-col">
                        <CardHeader>
                           <div className='flex items-center gap-4'>
                                <Briefcase className='w-8 h-8 text-primary' />
                                <CardTitle className='text-2xl'>Untuk Distributor</CardTitle>
                           </div>
                            <CardDescription>Optimalkan layanan dan dukungan untuk klinik Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1'>
                             <p>Monitor status perangkat di semua klinik Anda, kelola tim teknisi, dan jadwalkan tugas maintenance dengan mudah. Pastikan klien Anda mendapatkan layanan terbaik.</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href="/partner/login">Login sebagai Distributor <ArrowRight className='ml-2' /></Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Berita &amp; Pembaruan Teknologi</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tetap terdepan dengan wawasan dan inovasi terbaru di industri perangkat estetika.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8">
              {newsItems.map((item, index) => (
                <Card key={index} className="text-left">
                  <CardHeader>
                    <span className={`text-sm font-semibold ${item.role === 'Super Admin' ? 'text-blue-600' : 'text-green-600'}`}>{item.role} Update</span>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 LaserTrack Lite. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
