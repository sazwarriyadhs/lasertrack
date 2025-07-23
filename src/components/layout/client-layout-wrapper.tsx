
'use client';

import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/app-context';
import { LanguageProvider } from '@/context/language-context';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/layout/splash-screen';

export function ClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  // This effect will run only on the client, once.
  useEffect(() => {
    // We check for 'true' because sessionStorage stores strings
    if (sessionStorage.getItem('splashShown') === 'true') {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
      <>
        {showSplash ? (
            <SplashScreen onFinished={handleSplashFinish} />
        ) : (
            <AppProvider>
            <LanguageProvider>
                {children}
                <Toaster />
            </LanguageProvider>
            </AppProvider>
        )}
      </>
  );
}
