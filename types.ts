export interface Project {
  id: number;
  badge: string[];
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  type: 'ACTIVE QUEST' | 'FINISHED';
}

export interface Skill {
  name: string;
  level: number; // 1-5
  icon: string; // Emoji or Lucide icon name
  category: 'Web' | 'AI / ML' | 'Tools';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}