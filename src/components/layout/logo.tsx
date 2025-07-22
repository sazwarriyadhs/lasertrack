import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
    variant?: 'default' | 'small';
}

export const Logo = ({ variant = 'default' }: LogoProps) => {
    const isSmall = variant === 'small';
    return (
        <div className={cn("flex items-center gap-2", isSmall ? 'h-auto' : 'h-16')}>
            <Image 
                src="/lashead.png" 
                alt="Serenity LaserTrack Logo" 
                width={isSmall ? 120 : 180} 
                height={isSmall ? 27 : 40} 
                priority 
            />
        </div>
    );
};
