import { Project, Skill } from './types';

export const PROFILE = {
  imageUrl: "/pfp.png",
};

export const MUSIC_URL = "/minecraft.mp3";

export const PROJECTS: Project[] = [
  {
    id: 1,
    badge: ["AI","Finished"],
    title: "Surakshan: AI-Powered accident detection and response system",
    description: "An AI-driven system that detects road accidents in real-time using computer vision and notifies emergency services automatically.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    imageUrl: "https://picsum.photos/400/300?random=1",
    link: "https://github.com/Ayush9791/Surakshan-Accident-Detection-and-Reporting-System",
    type: "FINISHED",
  },
  {
    id: 2,
    badge: ["discord", "Finished"],
    title: "Grizzy discord bot",
    description: "A multifunctional Discord bot built with discord.py, featuring moderation tools, fun commands, and music playback capabilities.",
    tags: ["discord.py", "Python"],
    imageUrl: "https://picsum.photos/400/300?random=2",
    link: "",
    type: 'FINISHED',
  },
  {
    id: 3,
    badge: ["web", "Finished"],
    title: "Particles.js",
    description: "A lightweight JavaScript library for creating interactive particle effects on cursor movement.",
    tags: ["JavaScript", "HTML", "CSS"],
    imageUrl: "https://picsum.photos/400/300?random=3",
    link: "",
    type: 'FINISHED',
  }
  ,
  {
    id: 4,
    badge: ["web", "Active Quest"],
    title: "Amazon Clone",
    description: "A full-stack Amazon clone built with React for the frontend and Node.js for the backend, featuring user authentication, product listings, and a shopping cart.",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://picsum.photos/400/300?random=4",
    link: "",
    type: 'ACTIVE QUEST',
  },
];

export const SKILLS: Skill[] = [
  // Web
  { name: "HTML", level: 5, icon: "📄", category: 'Web' },
  { name: "CSS", level: 5, icon: "🎨", category: 'Web' },
  { name: "TypeScript", level: 5, icon: "📘", category: 'Web' },
  { name: "React", level: 5, icon: "⚛️", category: 'Web' },
  { name: "Node.js", level: 4, icon: "🟢", category: 'Web' },
  { name: "JavaScript", level: 5, icon: "📜", category: 'Web' },
  
  // AI / ML
  { name: "Python", level: 5, icon: "🐍", category: 'AI / ML' },
  { name: "NumPy", level: 4, icon: "🔢", category: 'AI / ML' },
  { name: "Pandas", level: 4, icon: "🐼", category: 'AI / ML' },
  { name: "Scikit-learn", level: 4, icon: "🔬", category: 'AI / ML' },
  { name: "TensorFlow / Keras", level: 4, icon: "🧠", category: 'AI / ML' },

  // Tools
  { name: "Git", level: 4, icon: "🌿", category: 'Tools' },
  { name: "GitHub", level: 5, icon: "🐙", category: 'Tools' },
  { name: "VS Code", level: 5, icon: "💻", category: 'Tools' },
];