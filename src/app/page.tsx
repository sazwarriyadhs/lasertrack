
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/layout/logo';
import { ArrowRight, Briefcase, Users, Award, Wrench, Package, BrainCircuit, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';


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

const featuredProducts = [
    "Laser PicoWay® untuk pigmentasi & tato",
    "Vbeam Perfecta® (pulsed-dye laser)",
    "BiAxis QS™ dan IPL Cellec V",
    "BeautiFill by LipoLife",
    "Teknologi anti-aging & pencerahan kulit",
    "Perawatan jerawat & bekas luka",
    "Contouring tubuh dan wajah",
];

const valueAddedServices = [
    { icon: BrainCircuit, title: "Pelatihan & Edukasi", description: "Pelatihan teknis dan product knowledge dari tingkat dasar hingga mahir." },
    { icon: UsersRound, title: "Webinar & Training", description: "Sesi bersama Key Opinion Leader (KOL) nasional dan internasional." },
    { icon: Wrench, title: "Servis & Pemeliharaan", description: "Dukungan teknis, suku cadang asli, dan garansi resmi." },
    { icon: Package, title: "Program Second-Life", description: "Revitalisasi perangkat bekas dengan kualitas terjamin seperti baru." },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Logo />
        <div className='flex items-center gap-2'>
            <Button asChild><Link href="/partner/login">Distributor Login</Link></Button>
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
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Disesuaikan untuk Distributor</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           Akses semua alat yang Anda butuhkan untuk mengelola klinik, perangkat, dan tim teknisi Anda secara efisien.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-2xl items-start gap-8 mt-12">
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

        <section id="featured-partner" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <span className="text-primary font-semibold">Mitra Unggulan</span>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">PT Regenesis Indonesia</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Menyediakan layanan komprehensif dan produk alat estetik medis terdepan untuk lebih dari 1.000 klinik kecantikan di seluruh Indonesia.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 mt-12 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="text-primary"/>Produk & Alat Medis Unggulan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           {featuredProducts.map((product, index) => (
                               <div key={index} className="flex items-center gap-3">
                                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                   <p className="text-muted-foreground">{product}</p>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        {valueAddedServices.map((service, index) => (
                             <Card key={index}>
                                <CardHeader className="p-4">
                                     <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{service.title}</CardTitle>
                                            <CardDescription>{service.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="news" className="w-full py-12 md:py-24 lg:py-32">
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
