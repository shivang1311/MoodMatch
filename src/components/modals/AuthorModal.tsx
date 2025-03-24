import React from 'react';
import { X, Linkedin, Mail } from 'lucide-react';

interface AuthorModalProps {
  onClose: () => void;
}

export function AuthorModal({ onClose }: AuthorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-300 shadow-xl mb-6">
              <img
                src="https://raw.githubusercontent.com/shivang1311/my-image/main/IMG_0446.JPG"
                alt="Shivang Agrawal"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://raw.githubusercontent.com/shivang-16/Personal_Portfolio/main/src/assets/images/shivang.jpg";
                }}
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Shivang Agrawal</h3>
            <p className="text-yellow-300 font-medium mb-6">Full Stack Web Developer & AI Enthusiast</p>

            <div className="max-w-xl space-y-4 mb-8">
              <p className="text-gray-300 leading-relaxed">
                Passionate about crafting intelligent and intuitive digital experiences, I specialize in full-stack web development 
                and AI-driven solutions. With a keen interest in merging technology with human emotions, I built MoodMatch to create 
                personalized and meaningful interactions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By leveraging AI-powered recommendations and seamless UI/UX, I aim to push the boundaries of innovation and enhance 
                user engagement in the digital world.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/shivangag1311/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-yellow-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:shivangag131104@gmail.com"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-yellow-300 transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}