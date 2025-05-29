// src/App.jsx (or src/HomePage.jsx)
import { Button } from '@/components/ui/button';
import Header from '@/components/Header'; // Assuming you have this component
import Footer from '@/components/Footer'; // Assuming you have this component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, PencilLine, Tag, MapPin, Search, Bot } from 'lucide-react';

// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    // Initialize the navigate hook
    const navigate = useNavigate();

    const features = [
        { icon: Wrench, title: "SEO Analyzer", description: "Pinpoint website issues and unlock ranking opportunities." },
        { icon: PencilLine, title: "AI Blog Content Generator", description: "Effortlessly create engaging, optimized blog posts in minutes." },
        { icon: Tag, title: "Meta Tags Generator", description: "Craft perfect, click-worthy titles and descriptions for search." },
        { icon: MapPin, title: "GMB Posts Generator", description: "Boost local visibility with automated Google Business Profile updates." },
        { icon: Search, title: "Keywords Generator", description: "Discover high-potential keywords to target your ideal audience." },
        { icon: Bot, title: "AI Chat Assistant", description: "Get instant SEO and content advice, any time you need it." },
    ];

    // Define the navigation function
    const handleNavigationToRegistration = () => {
        // Use navigate to go to the specified path
        navigate('/ai-assistant-registration');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white min-h-[500px]">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                    Dominate Search, Create with AI.
                </h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-3xl mb-8">
                    Your all-in-one platform for SEO analysis, AI-powered content generation, and local visibility.
                </p>
                <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={handleNavigationToRegistration} // Add onClick handler here
                >
                    Create an Account NOW!
                </Button>
            </section>

            {/* Features Section (no changes here as it's just display) */}
            <section id="features" className="py-20 px-4 bg-muted">
                <div className="container mx-auto text-center max-w-6xl">
                    <h2 className="text-4xl font-bold mb-4">Unleash Your Online Potential</h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        Everything you need to analyze, create, and optimize for top rankings.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <feature.icon className="h-12 w-12 text-primary mb-4" />
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardDescription>{feature.description}</CardDescription>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-4 bg-primary text-white text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to See Your Website Soar?</h2>
                <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={handleNavigationToRegistration} // Add onClick handler here
                >
                    Get Started with Refurbish AI Assistant
                </Button>
            </section>

            <Footer />
        </div>
    );
}