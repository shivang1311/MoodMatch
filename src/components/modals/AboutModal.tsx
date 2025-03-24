import React from 'react';
import { Info, X, Zap, Star, Globe, Sparkles, Heart, Users } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto safe-top safe-bottom">
      <div 
        className="relative max-w-4xl w-full bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-black/90 rounded-2xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(79, 70, 229, 0.4) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 active-state"
          aria-label="Close modal"
        >
          <X size={24} className="text-white" />
        </button>

        <div className="p-6 md:p-8 lg:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-yellow-300 animate-gradient inline-flex items-center justify-center gap-3 mb-4">
              <Info className="w-8 h-8 md:w-10 md:h-10 text-yellow-300" />
              About MoodMatch
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Where AI meets emotion to create your perfect entertainment experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 backdrop-blur-lg transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                How It Works
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Heart, text: "Share your feelings naturally" },
                  { icon: Star, text: "AI analyzes your emotional state" },
                  { icon: Globe, text: "Choose your preferences" },
                  { icon: Sparkles, text: "Get perfect recommendations" }
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-300/10 rounded-lg">
                      <step.icon className="w-5 h-5 text-yellow-300" />
                    </div>
                    <p className="text-white mt-1">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 backdrop-blur-lg transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                {[
                  "Advanced emotion analysis across languages",
                  "Extensive global entertainment library",
                  "Personalized recommendations that learn",
                  "Seamless streaming platform integration"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-300/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                    </div>
                    <p className="text-white mt-1">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-300/10 via-pink-300/10 to-yellow-300/10 rounded-2xl p-6 md:p-8 border border-white/20 backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              MoodMatch represents the future of entertainment discovery, where technology understands and responds to human emotions. 
              We believe that the perfect song or movie has the power to transform your mood and enhance your day.
            </p>
          </div>

          <div className="text-center mt-10">
            <p className="text-lg font-medium text-yellow-300">
              "Every emotion deserves its perfect entertainment match"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}