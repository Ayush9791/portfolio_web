import React, { useEffect, useState } from 'react';

interface Orb {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
}

export const ExperienceOrbs: React.FC = () => {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    // Generate static random values on mount to prevent hydration mismatch or constant re-rendering
    const newOrbs = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 20
    }));
    setOrbs(newOrbs);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute bg-[#a8f331] border-2 border-[#7aaf22] opacity-0"
          style={{
            left: `${orb.left}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            bottom: '50px',
            animation: `orb-float ${orb.animationDuration}s linear infinite`,
            animationDelay: `${orb.delay}s`,
            boxShadow: '0 0 10px #ccf978'
          }}
        />
      ))}
    </div>
  );
};
