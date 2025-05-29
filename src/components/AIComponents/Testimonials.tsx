import { Card, CardContent } from "@/components/ui/card"; // Add CardContent
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "RankRight transformed our SEO efforts. The AI content generator alone saved us hours!",
    author: "Jane Doe, Marketing Manager at Alpha Solutions",
    stars: 5,
  },
  {
    quote: "The GMB post generator is a game-changer for our local business visibility. Highly recommend!",
    author: "John Smith, Owner of Local Eats Diner",
    stars: 5,
  },
  // Add more testimonials
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-8 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">What Our Users Are Saying</h2>
        <p className="text-xl text-muted-foreground mb-12">Trusted by hundreds of businesses to boost their online presence.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-center">
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="flex">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic text-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <p className="font-semibold text-primary">{testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}