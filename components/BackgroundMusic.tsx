import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Disc, Volume2, VolumeX, Music } from 'lucide-react';
import { MUSIC_URL } from '../constants';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);
  const startedRef = useRef(false);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;
    try {
      await audio.play();
      startedRef.current = true;
      setIsPlaying(true);
    } catch {
      // Browsers may block audible autoplay. Retry after the first user gesture.
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    // Try to start automatically on page load.
    void startPlayback();

    // If the browser blocks sound autoplay, start on the first meaningful user
    // gesture anywhere on the page. Keep the dedicated jukebox control available.
    const resumeOnGesture = () => {
      if (!startedRef.current && !userPausedRef.current) void startPlayback();
    };
    window.addEventListener('pointerdown', resumeOnGesture, { passive: true });
    window.addEventListener('keydown', resumeOnGesture);

    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('keydown', resumeOnGesture);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audioRef.current = null;
    };
  }, [startPlayback]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      return;
    }

    userPausedRef.current = false;
    try {
      await audio.play();
      startedRef.current = true;
      setIsPlaying(true);
    } catch (error) {
      console.warn('C418 background music could not start:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 animate-in slide-in-from-left duration-500">
      <div className={`transition-all duration-500 overflow-hidden ${isPlaying ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
        <div className="bg-[#212121] border-2 border-white text-yellow-400 p-2 font-['VT323'] text-lg shadow-md flex items-center gap-2 mb-2">
          <Music size={16} className="animate-bounce" />
          <span>Now Playing: C418</span>
        </div>
      </div>

      <div className="flex items-end gap-2">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 flex items-center justify-center border-4 transition-all duration-200 group relative ${isPlaying ? 'bg-[#b35d58] border-[#5e2622] hover:bg-[#c96d67]' : 'bg-[#3a3a3a] border-[#1a1a1a] hover:bg-[#4a4a4a]'} minecraft-shadow active:translate-y-1 active:shadow-none`}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Disc size={28} className={isPlaying ? 'text-[#50e3c2]' : 'text-gray-500'} />
            <div className="absolute inset-0 m-auto w-2 h-2 bg-black rounded-full"></div>
          </div>
          {isPlaying && (
            <>
              <Music size={12} className="absolute -top-4 -right-2 text-blue-300 animate-float" style={{ animationDuration: '2s' }} />
              <Music size={10} className="absolute -top-2 -right-6 text-green-300 animate-float" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="hidden sm:flex w-8 h-8 bg-gray-700 border-2 border-gray-900 items-center justify-center text-white hover:bg-gray-600"
            title={isMuted ? 'Unmute music' : 'Mute music'}
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
      `}</style>
    </div>
  );
};
