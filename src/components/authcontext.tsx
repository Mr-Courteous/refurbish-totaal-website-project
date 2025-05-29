// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/components/superbaseClient'; // Adjust path if your supabaseClient is elsewhere

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

// Create the context. It will hold the session and loading state.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The AuthProvider component will fetch and manage the Supabase session.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // True initially, as we're checking the session

  useEffect(() => {
    // 1. Initial check for existing session (e.g., from local storage)
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setLoading(false); // Finished initial check
    });

    // 2. Listen for real-time authentication state changes
    // This will update the session when a user logs in, logs out, or token refreshes.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setLoading(false); // Update loading state on any auth change
      }
    );

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Provide the session and loading state to any child components that consume this context
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the authentication context
// This makes it easy for any component to get the session and loading state.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};