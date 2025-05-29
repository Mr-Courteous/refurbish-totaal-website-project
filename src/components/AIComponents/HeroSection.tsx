import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-[600px] bg-gradient-to-r from-primary to-purple-600 text-white text-center p-8">
      <div className="z-10 max-w-4xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Rank Higher, Write Smarter, Grow Faster.
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Your complete AI-powered suite for SEO analysis, content generation, and local visibility.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Start Your Free Trial
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
            Watch Demo
          </Button>
        </div>
      </div>
      {/* Optional: Add a subtle background pattern or illustration */}
      {/* <div className="absolute inset-0 bg-hero-pattern opacity-10"></div> */}
    </section>
  );
}