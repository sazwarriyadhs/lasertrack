'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { User, Role } from '@/lib/types';
import { users } from '@/lib/data';

interface AppContextType {
  user: User;
  setUserRole: (role: Role) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // Default to Super Admin

  const setUserRole = (role: Role) => {
    const newUser = users.find(u => u.role === role);
    if (newUser) {
      setCurrentUser(newUser);
    }
  };

  const contextValue = useMemo(() => ({
    user: currentUser,
    setUserRole,
  }), [currentUser]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
