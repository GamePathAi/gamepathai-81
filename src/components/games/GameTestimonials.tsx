
import React from "react";
import { useTranslation } from "react-i18next";
import { GameData } from "@/hooks/useGameData";
import { Star } from "lucide-react";

interface GameTestimonialsProps {
  game: GameData;
}

const GameTestimonials: React.FC<GameTestimonialsProps> = ({ game }) => {
  const { t } = useTranslation();
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#33C3F0" : "none"}
        className={i < rating ? "text-cyber-blue" : "text-gray-500"}
      />
    ));
  };

  return (
    <section className="py-16 bg-cyber-darkblue relative">
      {/* Background accents */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-cyber-purple/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-tech text-white mb-4">
            {t('games.testimonials.title', { game: game.name })}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('games.testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {game.testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-cyber-cardblue border border-cyber-blue/20 p-6 rounded-lg relative"
            >
              {/* Quote top accent */}
              <div className="absolute -top-3 -left-3 text-cyber-blue/20 text-6xl">"</div>
              
              <div className="mb-4 flex">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-300 mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center mt-4">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full border-2 border-cyber-blue/30 mr-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyber-blue/20 border-2 border-cyber-blue/30 flex items-center justify-center text-cyber-blue mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                
                <div>
                  <div className="font-tech text-white">{testimonial.name}</div>
                  <div className="text-cyber-blue text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameTestimonials;
