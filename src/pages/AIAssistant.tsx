// src/pages/AIAssistant.tsx
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import Auth from '@/components/AIComponents/LoginSignup'; // Your Auth component
import { useAuth } from '@/components/authcontext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AIAssistant = () => {
    const { session, loading } = useAuth(); // Get the session and loading state
    const navigate = useNavigate(); // Get the navigation function

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount

        // --- Logic to check session and redirect ---
        if (!loading) { // Ensure authentication status has been determined
            if (session) {
                // If the user IS logged in (valid session found)
                console.log("Logged-in user accessed AIAssistant. Redirecting to dashboard.");
                navigate('/ai-dashboard', { replace: true }); // Redirect to dashboard
            }
            // else {
            //     // If the user is NOT logged in, no action needed,
            //     // the component will continue to render its content (including <Auth />)
            //     console.log("Logged-out user on AIAssistant page. Displaying content.");
            // }
        }
    }, [loading, session, navigate]); // Rerun effect if loading, session, or navigate changes

    // Show a loading state while we check authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <p className="text-xl font-semibold">Checking your session...</p>
            </div>
        );
    }

    // If we've reached here and 'session' is null,
    // it means the user is NOT logged in, so render the public content.
    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title> Meet Your AI Assistant | Your Website growth </title>
                <meta name="description" content="Erhalten Sie Expertenhilfe beim Aufbau Ihrer Website mit unserem KI-Assistenten. Von Meta-Tags bis hin zu Titeln und Beschreibungen bietet unser KI-Tool personalisierte Vorschläge, um die SEO und Online-Präsenz Ihrer Website zu verbessern." />
            </Helmet>

            <Header />
            <main className="flex-grow">
                <div className="container py-8 md:py-12 px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">AI Assistant just for (you)</h1>
                    <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
                        Build your website with our AI tools just for you.
                    </p>
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                        <Auth /> {/* This Auth component will be displayed here for logged-out users */}
                    </div>
                </div>
            </main>
            <Footer />
            <Toaster position="top-center" richColors closeButton />
        </div>
    );
};

export default AIAssistant;