import React, { useState, useRef, useEffect } from 'react';
import { Disc, Volume2, VolumeX, Music } from 'lucide-react';
import { MUSIC_URL } from '../constants';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Start at 30% volume
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Browsers require interaction to play audio. 
      // Since this is triggered by a click, it will work.
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 animate-in slide-in-from-left duration-500">
      
      {/* Now Playing Toast (Only shows when playing) */}
      <div className={`
        transition-all duration-500 overflow-hidden
        ${isPlaying ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
      `}>
        <div className="bg-[#212121] border-2 border-white text-yellow-400 p-2 font-['VT323'] text-lg shadow-md flex items-center gap-2 mb-2">
           <Music size={16} className="animate-bounce" />
           <span>Now Playing: C418 - Style</span>
        </div>
      </div>

      <div className="flex items-end gap-2">
        {/* Main Jukebox Button */}
        <button
          onClick={togglePlay}
          className={`
            w-12 h-12 flex items-center justify-center border-4 transition-all duration-200 group relative
            ${isPlaying 
              ? 'bg-[#b35d58] border-[#5e2622] hover:bg-[#c96d67]' // Jukebox / Note Block Reddish
              : 'bg-[#3a3a3a] border-[#1a1a1a] hover:bg-[#4a4a4a]' // Dark Gray (Off)
            }
            minecraft-shadow active:translate-y-1 active:shadow-none
          `}
          title={isPlaying ? "Stop Music" : "Play Music"}
        >
          <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
             <Disc 
               size={28} 
               className={`
                 ${isPlaying ? 'text-[#50e3c2]' : 'text-gray-500'} 
               `}
             />
             {/* Center hole of the record */}
             <div className="absolute inset-0 m-auto w-2 h-2 bg-black rounded-full"></div>
          </div>
          
          {/* Note particles when playing */}
          {isPlaying && (
            <>
              <Music size={12} className="absolute -top-4 -right-2 text-blue-300 animate-float" style={{ animationDuration: '2s' }} />
              <Music size={10} className="absolute -top-2 -right-6 text-green-300 animate-float" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            </>
          )}
        </button>
        
        {/* Simple Volume Toggle (Hidden on very small screens to save space) */}
        {isPlaying && (
          <button 
             onClick={() => setIsMuted(!isMuted)}
             className="hidden sm:flex w-8 h-8 bg-gray-700 border-2 border-gray-900 items-center justify-center text-white hover:bg-gray-600"
          >
             {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};