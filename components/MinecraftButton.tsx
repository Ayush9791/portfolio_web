import React from 'react';

interface MinecraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const MinecraftButton: React.FC<MinecraftButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Added duration-75 for snappy clicks, hover:-translate-y-0.5 for subtle lift
  const baseStyle = "font-['VT323'] text-2xl px-6 py-3 border-b-4 border-r-4 active:border-b-0 active:border-r-0 active:mt-1 active:ml-1 transition-all duration-75 ease-out hover:-translate-y-0.5 hover:shadow-lg minecraft-shadow relative";
  
  const variants = {
    primary: "bg-[#588d3e] border-[#2e4b21] text-white hover:bg-[#6ab04c]", // Grass Green
    secondary: "bg-[#7d7d7d] border-[#424242] text-white hover:bg-[#9e9e9e]", // Stone Gray
    danger: "bg-[#c0392b] border-[#8a261e] text-white hover:bg-[#e74c3c]" // TNT Red
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MinecraftButton;