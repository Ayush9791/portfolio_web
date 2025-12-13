import React, { useEffect } from 'react';

interface ToastProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
}

export const AchievementToast: React.FC<ToastProps> = ({ title, icon, onClose }) => {
  useEffect(() => {
    // Auto dismiss after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed top-20 right-4 z-50 animate-in slide-in-from-right fade-in duration-500 cursor-pointer pointer-events-auto" 
      onClick={onClose}
    >
      <div className="bg-[#212121] border-4 border-white border-l-yellow-400 p-3 min-w-[280px] max-w-sm flex items-center gap-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
        <div className="bg-[#588d3e] p-2 border-2 border-[#2e4b21] flex items-center justify-center min-w-[48px] min-h-[48px]">
           {icon}
        </div>
        <div className="overflow-hidden">
          <h4 className="text-yellow-400 font-bold text-lg mb-0 leading-none tracking-wide">Achievement Get!</h4>
          <p className="text-white text-md mt-1 truncate">{title}</p>
        </div>
      </div>
    </div>
  );
};