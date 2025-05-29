import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js'; // Import Session type
import { supabase } from '@/components/superbaseClient'; // Adjust path if your supabaseClient is elsewhere

// Optional: If you use shadcn/ui (recommended for good styling)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Button}  from '@/components/ui/button';

type AuthMode = 'signIn' | 'signUp';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signIn');

  // Listen for auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Stop initial loading
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setLoading(false); // Stop loading on subsequent changes
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (authMode === 'signUp') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Specify the URL where Supabase should redirect the user after Google authentication
          // This URL MUST be added to your "Redirect URLs" in the Supabase dashboard
          // redirectTo: 'https://www.google.com', 
          // Or '/auth/callback'
        },
      });
      if (error) throw error;
      // Supabase handles the redirect to Google and then back to your app
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert('Signed out successfully!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !session) { // Show initial loading only if no session yet
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-xl font-semibold">Loading authentication state...</p>
      </div>
    );
  }

  return (
    <Card className="w-[400px] mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>{session ? 'Welcome!' : (authMode === 'signIn' ? 'Sign In' : 'Sign Up')}</CardTitle>
        <CardDescription>
          {session
            ? 'You are currently logged in.'
            : (authMode === 'signIn'
              ? 'Enter your credentials or use social login.'
              : 'Create an account.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {session ? (
          <div className="space-y-4 text-center">
            <p className="text-lg font-medium">
              Logged in as: <span className="font-bold text-blue-600">{session.user?.email || session.user?.user_metadata?.full_name || 'User'}</span>
            </p>
            <Button onClick={handleSignOut} disabled={loading} className="w-full">
              {loading ? 'Signing out...' : 'Sign Out'}
            </Button>
            <div className="mt-4 text-sm text-gray-500">
              User ID: <span className="font-mono text-xs">{session.user?.id}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              {authMode === 'signUp' && (
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters.</p>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? (authMode === 'signIn' ? 'Signing in...' : 'Signing up...') : (authMode === 'signIn' ? 'Sign In' : 'Sign Up')}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center gap-2"
            >
              {loading && !error ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" /> : null}
              Sign In with Google
            </Button>
            <div className="text-center text-sm mt-4">
              {authMode === 'signIn' ? (
                <>
                  Don't have an account?{' '}
                  <Button variant="link" onClick={() => setAuthMode('signUp')} className="p-0 h-auto">
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Button variant="link" onClick={() => setAuthMode('signIn')} className="p-0 h-auto">
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default Auth;