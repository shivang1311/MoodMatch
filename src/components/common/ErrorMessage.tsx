import React from 'react';
import { Info } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-6 p-6 bg-white/5 backdrop-blur-xl border border-yellow-300/20 text-white rounded-xl animate-slideDown">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-yellow-300/10 rounded-lg">
          <Info className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <p className="text-lg font-medium text-yellow-300 mb-1">Friendly Reminder</p>
          <p className="text-gray-300">{message}</p>
        </div>
      </div>
    </div>
  );
}