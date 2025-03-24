import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 ${className}`}>
      {children}
    </div>
  );
}