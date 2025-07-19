
'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { User, Role } from '@/lib/types';
import { users } from '@/lib/data';

interface AppContextType {
  user: User;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved session on mount
  useEffect(() => {
    try {
        const savedUserRole = sessionStorage.getItem('userRole');
        if (savedUserRole) {
            const userToSet = users.find(u => u.role === savedUserRole) || users[0];
            setCurrentUser(userToSet);
            setIsAuthenticated(true);
        }
    } catch (e) {
        // sessionStorage is not available
        console.warn('Session storage is not available. User state will not be persisted.');
    }
  }, []);

  const login = (role: Role) => {
    const newUser = users.find(u => u.role === role);
    if (newUser) {
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        try {
            sessionStorage.setItem('userRole', role);
        } catch (e) {
            console.warn('Session storage is not available. User state will not be persisted.');
        }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
        sessionStorage.removeItem('userRole');
    } catch (e) {
         console.warn('Session storage is not available.');
    }
    // Redirect logic is handled in components
  };

  const contextValue = useMemo(() => ({
    user: currentUser,
    isAuthenticated,
    login,
    logout,
  }), [currentUser, isAuthenticated]);

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
