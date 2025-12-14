import { Project, Skill } from './types';

export const PROFILE = {
  imageUrl: "/pfp.png",
};

export const MUSIC_URL = "/minecraft.mp3";

export const PROJECTS: Project[] = [
  {
    id: 1,
    badge: ["AI","Active Quest"],
    title: "Surakshan: AI-Powered accident detection and response system",
    description: "An AI-driven system that detects road accidents in real-time using computer vision and notifies emergency services automatically.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    imageUrl: "https://picsum.photos/400/300?random=1",
    link: "https://github.com/Ayush9791/Surakshan-Accident-Detection-and-Reporting-System",
    type: "ACTIVE QUEST",
  },
  
];

export const SKILLS: Skill[] = [
  // Web
  { name: "HTML", level: 5, icon: "📄", category: 'Web' },
  { name: "CSS", level: 5, icon: "🎨", category: 'Web' },
  { name: "TypeScript", level: 5, icon: "📘", category: 'Web' },
  { name: "React", level: 5, icon: "⚛️", category: 'Web' },
  { name: "Node.js", level: 4, icon: "🟢", category: 'Web' },
  
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