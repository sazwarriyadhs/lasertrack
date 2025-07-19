
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/layout/logo';
import { ArrowRight, Briefcase, Users, Award, Wrench, Package, BrainCircuit, UsersRound, Building2, UserCheck, Hospital, HardHat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


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

const featuredProductsRegenesis = [
  { product: 'Laser PicoWay®', brand: 'Candela PicoWay®', indication: 'Pigmentasi, penghapusan tato, melasma, peremajaan kulit.' },
  { product: 'Vbeam Perfecta®', brand: 'Candela Vbeam', indication: 'Kemerahan, rosacea, lesi vaskular, flek hitam, bekas jerawat.' },
  { product: 'BiAxis QS™', brand: 'BiAxis QS', indication: 'Pigmentasi, tato, stimulasi kolagen, penghapusan noda.' },
  { product: 'IPL Cellec V', brand: 'Cellec V IPL', indication: 'Pencerahan, jerawat, pigmentasi, kulit tidak merata.' },
  { product: 'BeautiFill', brand: 'LipoLife / Alma Lasers', indication: 'Body contouring & tightening melalui diode laser 1470 nm.' },
];

const valueAddedServicesRegenesis = [
    { icon: BrainCircuit, title: "Pelatihan & Edukasi", description: "Pelatihan teknis dan product knowledge dari tingkat dasar hingga mahir." },
    { icon: UsersRound, title: "Webinar & Training", description: "Sesi bersama Key Opinion Leader (KOL) nasional dan internasional." },
    { icon: Wrench, title: "Servis & Pemeliharaan", description: "Dukungan teknis, suku cadang asli, dan garansi resmi." },
    { icon: Package, title: "Program Second-Life", description: "Revitalisasi perangkat bekas dengan kualitas terjamin seperti baru." },
];

const featuredProductsInnomed = [
    { product: 'Transcranial Pulse Stimulation (TPS®)', brand: 'STORZ Medical – Neurolith®', indication: 'Terapi non-invasif untuk Alzheimer & demensia; stimulasi neuroplastisitas.' },
    { product: 'Phototherapy & Photobiomodulation', brand: 'Daavlin – Series 3 Neolux', indication: 'Terapi fototerapi untuk vitiligo, eczema, dan kondisi kulit lainnya.' },
    { product: 'Skin Analysis & Imaging System', brand: 'Canfield – VISIA®', indication: 'Analisis kulit profesional untuk pigmentasi, pori, dan tekstur.' },
    { product: 'CO₂ Fractional Laser', brand: 'Lasering – Slim Evolution II', indication: 'Resurfacing kulit, reduksi kerutan dan bekas luka.' },
];

const distributorNetwork = [
  { company: 'PT Regenesis Indonesia', brands: 'Candela (PicoWay®, Vbeam), Alma BeautiFill', services: 'Picosecond laser, pulsed-dye, diode laser untuk pigmentation, tattoo removal, acne, rejuvenation, body contouring', website: 'https://regenesis.co.id' },
  { company: 'PT Innomed Jaya Utama', brands: 'Lasering (MiXto Pro), Canfield, STORZ', services: 'CO₂ fractional, skin resurfacing, laser tightening, skin analysis', website: 'https://innomed.asia' },
  { company: 'PT Redo Marketing Indonesia', brands: 'EndyMed, Deka, Sciton (kemungkinan melalui mitra)', services: 'RF microneedling, fractional laser, long-pulse Nd:YAG, resurfacing laser', website: 'https://redo.co.id' },
  { company: 'PT Estetika Pro International (Espro)', brands: 'Espro Laser (OEM), Korea laser brands (Q-Switched, Diode, CO₂)', services: 'Q-Switched Nd:YAG, Diode Hair Removal, Fractional CO₂. Memiliki 3 beauty clinic & 1 beauty school; melayani puluhan klinik & RS di Indonesia.', website: 'https://espro.co.id' },
  { company: 'PT I-Tech Lafacos', brands: 'Quanta System, Jeisys, Apyx', services: 'Q-Switched Nd:YAG, Pico laser, CO₂ fractional, LIPO laser', website: 'https://itechlafacos.com' },
  { company: 'ASAA Medical Indonesia', brands: 'Alma Lasers (exklusif Indonesia)', services: 'Harmony XL Pro, Soprano Titanium, Accent Prime, BeautiFill', website: 'https://asaamedical.com' },
  { company: 'PT Optima Derma Tech (Optiderm)', brands: 'OZONOVA, CFU ELIFE, dan laser OEM Korea', services: 'Laser untuk skin rejuvenation, whitening, pigmentation', website: 'https://optiderm.co.id' },
];

const regenesisPartnerClinics = [
    { name: 'Arayu Aesthetic Clinic', city: 'Makassar', focus: 'Produk ISISPHARMA, pelatihan & dukungan Regenesis' },
    { name: 'Dermalogia Aesthetic Clinic', city: 'Jakarta', focus: 'Alat-alat laser seperti PicoWay, Vbeam, Cellec V' },
];


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Logo />
        <div className='flex items-center gap-2'>
             <Button variant="outline" asChild><Link href="/clinic/login">Clinic</Link></Button>
             <Button variant="outline" asChild><Link href="/technician/login">Technician</Link></Button>
            <Button asChild><Link href="/partner/login">Distributor</Link></Button>
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
               <Carousel className="w-full max-w-xl mx-auto lg:order-last" opts={{ loop: true }}>
                  <CarouselContent>
                    <CarouselItem>
                       <Image
                            src="/slide1.jpeg"
                            width="1200"
                            height="600"
                            alt="Hero Image 1"
                            data-ai-hint="aesthetic laser treatment"
                            className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem>
                       <Image
                            src="/slide2.jpeg"
                            width="1200"
                            height="600"
                            alt="Hero Image 2"
                            data-ai-hint="modern clinic reception"
                            className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src="/slide3.jpeg"
                            width="1200"
                            height="600"
                            alt="Hero Image 3"
                            data-ai-hint="professional technician smiling"
                            className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                        />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
            </div>
          </div>
        </section>

        <section id="roles" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Disesuaikan untuk Setiap Peran</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           Akses semua alat yang Anda butuhkan, baik Anda seorang distributor atau klinik, untuk mengelola operasional Anda secara efisien.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3">
                     <Card className="flex flex-col">
                        <CardHeader>
                           <div className='flex items-center gap-4'>
                                <Briefcase className='w-8 h-8 text-primary' />
                                <CardTitle className='text-2xl'>Distributor</CardTitle>
                           </div>
                            <CardDescription>Optimalkan layanan dan dukungan untuk klinik Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1'>
                             <p>Monitor status perangkat, kelola tim teknisi, dan jadwalkan tugas maintenance dengan mudah.</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href="/partner/login">Login <ArrowRight className='ml-2' /></Link>
                            </Button>
                        </div>
                    </Card>
                     <Card className="flex flex-col">
                        <CardHeader>
                           <div className='flex items-center gap-4'>
                                <Hospital className='w-8 h-8 text-primary' />
                                <CardTitle className='text-2xl'>Klinik</CardTitle>
                           </div>
                            <CardDescription>Fokus pada pasien, bukan manajemen alat.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1'>
                             <p>Lihat status perangkat, minta jadwal perbaikan, dan lacak riwayat maintenance dengan mudah.</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href="/clinic/login">Login <ArrowRight className='ml-2' /></Link>
                            </Button>
                        </div>
                    </Card>
                     <Card className="flex flex-col">
                        <CardHeader>
                           <div className='flex items-center gap-4'>
                                <HardHat className='w-8 h-8 text-primary' />
                                <CardTitle className='text-2xl'>Teknisi</CardTitle>
                           </div>
                            <CardDescription>Akses tugas Anda dan laporkan progres di lapangan.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1'>
                             <p>Lihat tugas maintenance yang ditugaskan, isi checklist, dan buat laporan langsung dari perangkat mobile.</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href="/technician/login">Login <ArrowRight className='ml-2' /></Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        <section id="featured-partner-1" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
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
                <div className="mx-auto grid max-w-5xl gap-8 mt-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="text-primary"/>Produk & Alat Medis</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Produk / Teknologi</TableHead>
                                       <TableHead>Merk / Brand</TableHead>
                                       <TableHead>Indikasi Utama</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {featuredProductsRegenesis.map((product, index) => (
                                       <TableRow key={index}>
                                           <TableCell className="font-medium">{product.product}</TableCell>
                                           <TableCell>{product.brand}</TableCell>
                                           <TableCell className="text-muted-foreground">{product.indication}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserCheck className="text-primary"/>Contoh Jaringan Klinik</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Nama Klinik</TableHead>
                                       <TableHead>Kota</TableHead>
                                       <TableHead>Indikasi Kerjasama / Produk Unggulan</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {regenesisPartnerClinics.map((clinic, index) => (
                                       <TableRow key={index}>
                                           <TableCell className="font-medium">{clinic.name}</TableCell>
                                           <TableCell>{clinic.city}</TableCell>
                                           <TableCell className="text-muted-foreground">{clinic.focus}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>

                     <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueAddedServicesRegenesis.map((service, index) => (
                             <Card key={index}>
                                <CardHeader className="p-4">
                                     <div className="flex flex-col items-start gap-4">
                                        <div className="bg-primary/10 p-2 rounded-full self-start">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                                            <CardDescription className="mt-1">{service.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="featured-partner-2" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <span className="text-primary font-semibold">Mitra Unggulan</span>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">PT Innomed Jaya Utama</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Distributor terkemuka untuk peralatan estetika dan medis canggih di Asia.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 mt-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="text-primary"/>Perangkat & Teknologi Unggulan</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Produk / Teknologi</TableHead>
                                       <TableHead>Merk / Brand</TableHead>
                                       <TableHead>Indikasi Utama</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {featuredProductsInnomed.map((product, index) => (
                                       <TableRow key={index}>
                                           <TableCell className="font-medium">{product.product}</TableCell>
                                           <TableCell>{product.brand}</TableCell>
                                           <TableCell className="text-muted-foreground">{product.indication}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <section id="distributor-network" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Jaringan Distributor Terkemuka di Indonesia</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  LaserTrack Lite bekerja sama dengan para pemimpin industri untuk menyediakan teknologi dan layanan terbaik.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="text-primary" />
                    Mitra Distributor
                  </CardTitle>
                  <CardDescription>Daftar beberapa distributor alat kesehatan dan estetika terkemuka di Indonesia.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Perusahaan</TableHead>
                        <TableHead>Merek Laser Utama</TableHead>
                        <TableHead>Jenis Laser & Indikasi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {distributorNetwork.map((distributor, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <a href={distributor.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                              {distributor.company}
                            </a>
                          </TableCell>
                          <TableCell>{distributor.brands}</TableCell>
                          <TableCell className="text-muted-foreground">{distributor.services}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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
