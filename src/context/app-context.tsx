
'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { User, Role } from '@/lib/types';
import { users, chatConversations, chatMessages } from '@/lib/data';

interface AppContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  unreadMessages: number;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // Default non-auth user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);


  useEffect(() => {
    try {
        const savedUserId = sessionStorage.getItem('userId');
        if (savedUserId) {
            const userToSet = users.find(u => u.id === savedUserId);
            if (userToSet) {
              const savedUserData = sessionStorage.getItem(`user_data_${userToSet.id}`);
              if (savedUserData) {
                  setCurrentUser(JSON.parse(savedUserData));
              } else {
                  setCurrentUser(userToSet);
              }
              setIsAuthenticated(true);
            }
        }
    } catch (e) {
        console.warn('Session storage is not available. User state will not be persisted.');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const myConversations = chatConversations.filter(c => c.participantIds.includes(currentUser.id));
      const myConversationIds = myConversations.map(c => c.id);
      
      const unreadCount = chatMessages.filter(
        msg => myConversationIds.includes(msg.conversationId) && msg.senderId !== currentUser.id
      ).length;

      // This is a simple simulation. In a real app, you'd check a `read` status.
      setUnreadMessages(unreadCount);
    } else {
      setUnreadMessages(0);
    }
  }, [currentUser, isAuthenticated]);

  const login = (email: string, password: string): User | null => {
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
            sessionStorage.setItem('userId', userToLogin.id);
        } catch (e) {
            console.warn('Session storage is not available. User state will not be persisted.');
        }
        setIsAuthenticated(true);
        setLoading(false);
        return userToLogin;
    }
    return null;
  };

  const logout = () => {
    setLoading(true);
    const nonAuthUser = users[0];
    setCurrentUser(nonAuthUser);
    setIsAuthenticated(false);
    try {
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
    unreadMessages,
    login,
    logout,
    updateUser,
  }), [currentUser, isAuthenticated, loading, unreadMessages]);

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
