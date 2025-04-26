
import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  game: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Alex Chen",
      role: "Pro FPS Player",
      content: "GamePath AI reduced my ping by over 30ms in competitive matches. The difference is game-changing, especially in high-stakes tournaments.",
      rating: 5,
      game: "Valorant"
    },
    {
      name: "Sarah Johnson",
      role: "Streamer",
      content: "As a streamer, I need both performance and reliability. GamePath AI delivers both and has made my streams much smoother with fewer frame drops.",
      rating: 5,
      game: "Apex Legends"
    },
    {
      name: "Jamal Williams",
      role: "Casual Gamer",
      content: "I was skeptical at first, but the performance boost is real. My games run smoother even during peak hours when servers are usually crowded.",
      rating: 4,
      game: "Call of Duty"
    }
  ];

  return (
    <section className="py-24 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tech">
            <span>Trusted by </span>
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Gamers Worldwide
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See what our users have to say about their experience with GamePath AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-cyber-darkblue border border-cyber-blue/30 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-cyber-yellow text-cyber-yellow" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-600" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <span className="text-xs bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded-full">
                  {testimonial.game}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
