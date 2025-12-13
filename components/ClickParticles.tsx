import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const ClickParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn particles if clicking on interactive elements to avoid visual clutter
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const count = 6;
      const newParticles: Particle[] = [];
      const colors = ['#5d4037', '#795548', '#8d6e63', '#a1887f', '#3e2723']; // Dirt/Wood colors

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 6
        });
      }
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // Cleanup
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 700);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-particle-explode bg-current"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            '--tx': `${(Math.random() - 0.5) * 150}px`,
            '--ty': `${(Math.random() - 0.5) * 150 + 50}px`, // Slight gravity bias
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};