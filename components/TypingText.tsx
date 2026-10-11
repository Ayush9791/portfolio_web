import React, { useState, useEffect } from 'react';

const phrases = [
  "Full Stack Developer",
  "AI Specialist",
  "Redstone Engineer",
  "Problem Solver",
  "Code Crafter",
];

export const TypingText: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((previous) => (previous + 1) % phrases.length);
    } else {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      timer = setTimeout(
        () => setDisplayText(currentPhrase.substring(0, nextLength)),
        isDeleting ? 50 : 150,
      );
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentPhraseIndex, displayText, isDeleting]);

  return (
    <span className="text-yellow-400" aria-live="polite">
      {displayText}
      <span className="cursor-blink text-white" aria-hidden="true">_</span>
    </span>
  );
};
