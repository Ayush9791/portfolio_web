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
    link: "https://github.com/Ayush9791/Surakshan-Accident-Detection-and-Reporting-System",
    type: "FINISHED",
  },
  {
    id: 2,
    badge: ["discord", "Finished"],
    title: "Grizzy discord bot",
    description: "A multifunctional Discord bot built with discord.py, featuring moderation tools, fun commands, and music playback capabilities.",
    tags: ["discord.py", "Python"],
    link: "https://github.com/Ayush9791/Grizzy",
    type: 'FINISHED',
  },
  {
    id: 3,
    badge: ["web", "Finished"],
    title: "Particles.js",
    description: "A lightweight JavaScript library for creating interactive particle effects on cursor movement.",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "",
    type: 'FINISHED', 
  },
  {
    id: 4, 
    badge: ["web", "Active Quest"],
    title: "Amazon Clone",
    description: "A full-stack Amazon clone built with React for the frontend and Node.js for the backend, featuring user authentication, product listings, and a shopping cart.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "",
    type: 'ACTIVE QUEST',
  },
  {
    id: 5,
    badge: ["AI", "Finished"],
    title: "CNN based lung cancer detection",
    description: "A convolutional neural network (CNN) model trained to detect lung cancer from medical imaging data, achieving high accuracy in classification.",
    tags: ["Python", "TensorFlow", "Keras"],
    link: "https://github.com/Ayush9791/CNNdetection",
    type: 'FINISHED',
  },
  {
    id: 6,
    badge: ["web", "Finished"],
    title: "Mealio: A food redistribution platform",
    description: "A web application that connects restaurants with surplus food to local charities, facilitating food donations and reducing waste.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/Ayush9791/mealio",
    type: 'FINISHED',
  },
  {
    id: 7,
    badge: ["Web", "Finished"],
    title: "DB Detective: A database mystery game",
    description: "A browser-based detective mystery game where players solve cases by exploring clues stored in a live PostgreSQL database. Game logic runs entirely client-side with Supabase for user registration and session tracking.",
    tags: ["HTML", "CSS", "JavaScript", "PostgreSQL", "Supabase"],
    link: "https://github.com/Ayush9791/dbdetective",
    type: 'FINISHED',
  },
  {
    id: 8,
    badge: ["AI", "Active Quest"],
    title: "AI Internship & Job Tracker",
    description: "An agentic AI system that autonomously tracks internship and job listings, matches opportunities to a user profile, and sends personalized application reminders. Built with a multi-step agent pipeline featuring tool-augmented search, memory management, and decision-making logic.",
    tags: ["Python", "LangChain", "Claude API", "React", "PostgreSQL"],
    link: "",
    type: 'ACTIVE QUEST',
  },
  {
    id: 9,
    badge: ["discord", "Finished"],
    title: "CricBot: Live cricket score Discord bot",
    description: "A Discord bot serving live cricket scorecard updates, ICC rankings, and player statistics to active servers using the Cricbuzz API via RapidAPI. Features modular command architecture with robust error handling and rate-limit management.",
    tags: ["Python", "discord.py", "Cricbuzz API"],
    link: "https://github.com/Ayush9791/cricket_webhook",
    type: 'FINISHED',
  },
  {
    id: 10,
    badge: ["AI", "Finished"],
    title: "Screen Sentinel: Privacy protection desktop app",
    description: "A cross-platform desktop application that detects hidden spyware and unauthorised camera/microphone access, protecting user privacy with real-time background monitoring. Submitted at HackHazard '25, competing against 100+ teams nationally.",
    tags: ["Electron.js", "JavaScript", "Screenpipe"],
    link: "",
    type: 'FINISHED',
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
  { name: "LangChain", level: 3, icon: "🔗", category: 'AI / ML' },
  { name: "Claude API", level: 4, icon: "🤖", category: 'AI / ML' },
  { name: "Prompt Engineering", level: 4, icon: "✍️", category: 'AI / ML' },

  // Tools
  { name: "Git", level: 4, icon: "🌿", category: 'Tools' },
  { name: "GitHub", level: 5, icon: "🐙", category: 'Tools' },
  { name: "VS Code", level: 5, icon: "💻", category: 'Tools' },
  { name: "Figma", level: 4, icon: "🎭", category: 'Tools' },
  { name: "Supabase", level: 3, icon: "⚡", category: 'Tools' },
];