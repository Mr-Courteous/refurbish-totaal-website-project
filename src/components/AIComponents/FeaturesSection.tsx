import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, PencilLine, Tag, MapPin, Search, Bot } from "lucide-react"; // Example icons

const features = [
  { icon: Wrench, title: "SEO Analyzer", description: "Identify technical issues, content gaps, and ranking opportunities with in-depth website audits." },
  { icon: PencilLine, title: "AI Blog Content Generator", description: "From outlines to full drafts, create engaging, SEO-optimized blog posts in minutes." },
  { icon: Tag, title: "Meta Tags Generator", description: "Generate compelling, click-worthy meta titles and descriptions optimized for search engines." },
  { icon: MapPin, title: "GMB Posts Generator", description: "Boost your local visibility by creating engaging Google Business Profile posts (updates, offers, events)." },
  { icon: Search, title: "Keywords Generator", description: "Uncover high-volume, low-competition keywords tailored to your niche and audience." },
  { icon: Bot, title: "AI Chatbot Assistant", description: "Get instant SEO and content advice, brainstorm ideas, and troubleshoot challenges 24/7." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-8 bg-muted">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Powerful Features to Elevate Your Online Presence</h2>
        <p className="text-xl text-muted-foreground mb-12">Everything you need to analyze, create, and conquer search engines.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center">
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
  );
}