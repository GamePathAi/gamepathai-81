
import React from 'react';
import { GameData } from '@/hooks/useGameData';
import { Star } from 'lucide-react';

interface GameTestimonialsProps {
  game: GameData;
}

const GameTestimonials: React.FC<GameTestimonialsProps> = ({ game }) => {
  return (
    <section className="py-20 bg-cyber-darkblue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tech">
            What Players Say About{" "}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              {game.name}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real feedback from gamers who have enhanced their {game.name} experience with GamePath AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {game.testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-cyber-cardblue border border-cyber-blue/30 rounded-xl p-6 hover:border-cyber-blue/60 transition-all"
            >
              <div className="flex items-center mb-4">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover border border-cyber-blue/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full mr-4 bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/30">
                    <span className="text-cyber-blue font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-cyber-blue fill-cyber-blue' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameTestimonials;
