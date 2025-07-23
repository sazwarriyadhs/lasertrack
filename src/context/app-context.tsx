
'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { User, Role } from '@/lib/types';
import { users } from '@/lib/data';

interface AppContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users.find(u => u.id === 'user-4')!); // Default non-auth user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    try {
        const savedUserRole = sessionStorage.getItem('userRole');
        if (savedUserRole) {
            let userToSet : User | undefined;
            
            const savedUserId = sessionStorage.getItem('userId');
            if (savedUserId) {
                userToSet = users.find(u => u.id === savedUserId);
            } else {
                 userToSet = users.find(u => u.role === savedUserRole as Role);
            }
            
            if(userToSet) {
              const savedUserData = sessionStorage.getItem(`user_data_${userToSet.id}`);
              if (savedUserData) {
                  setCurrentUser(JSON.parse(savedUserData));
              } else {
                  setCurrentUser(userToSet);
              }
              sessionStorage.setItem('userId', userToSet.id);
              setIsAuthenticated(true);
            }
        }
    } catch (e) {
        console.warn('Session storage is not available. User state will not be persisted.');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const userToLogin = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (userToLogin) {
        setLoading(true);
        try {
            const savedUserData = sessionStorage.getItem(`user_data_${userToLogin.id}`);
            if (savedUserData) {
                setCurrentUser(JSON.parse(savedUserData));
            } else {
                setCurrentUser(userToLogin);
            }
            sessionStorage.setItem('userRole', userToLogin.role);
            sessionStorage.setItem('userId', userToLogin.id);
        } catch (e) {
            console.warn('Session storage is not available. User state will not be persisted.');
        }
        setIsAuthenticated(true);
        setLoading(false);
        return true;
    }
    return false;
  };

  const logout = () => {
    setLoading(true);
    const nonAuthUser = users.find(u => u.id === 'user-4')!;
    setCurrentUser(nonAuthUser);
    setIsAuthenticated(false);
    try {
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userId');
        users.forEach(user => sessionStorage.removeItem(`user_data_${user.id}`));
    } catch (e) {
         console.warn('Session storage is not available.');
    }
    setLoading(false);
  };
  
  const updateUser = (updatedData: Partial<User>) => {
    setCurrentUser(prevUser => {
        const updatedUser = { ...prevUser, ...updatedData };
        try {
           sessionStorage.setItem(`user_data_${updatedUser.id}`, JSON.stringify(updatedUser));
       } catch (e) {
            console.warn('Session storage is not available.');
       }
       return updatedUser;
    });
  };

  const contextValue = useMemo(() => ({
    user: currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  }), [currentUser, isAuthenticated, loading]);

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
