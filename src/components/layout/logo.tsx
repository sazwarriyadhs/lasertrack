import Image from 'next/image';

export const Logo = () => (
    <div className="flex items-center gap-2 h-16">
        <Image src="/logo.png" alt="SERENITY LaserTrack Logo" width={180} height={40} priority />
    </div>
);
