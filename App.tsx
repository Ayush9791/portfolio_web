import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Pickaxe, User, CheckCircle, Trophy, Sun, Moon, Flame } from 'lucide-react';
import { PROJECTS, SKILLS, PROFILE } from './constants';
import ChatBot from './components/ChatBot';
import MinecraftButton from './components/MinecraftButton';
import { TypingText } from './components/TypingText';
import { ExperienceOrbs } from './components/ExperienceOrbs';
import { AchievementToast } from './components/AchievementToast';
import { ClickParticles } from './components/ClickParticles';
import { BackgroundMusic } from './components/BackgroundMusic';

type Theme = 'overworld' | 'nether';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'All' | 'AI' | 'Web'>('All');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [theme, setTheme] = useState<Theme>('overworld');
  const [achievement, setAchievement] = useState<{ title: string; icon: React.ReactNode } | null>(null);

  // Trigger initial achievement
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAchievement('Taking Inventory', <User className="text-white" />);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const triggerAchievement = (title: string, icon: React.ReactNode) => {
    setAchievement({ title, icon });
    // Auto clear is handled in the component, but we can clear state here to allow re-triggering same one later if needed
    setTimeout(() => setAchievement(null), 4500);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'overworld' ? 'nether' : 'overworld';
    setTheme(newTheme);
    triggerAchievement(
      newTheme === 'nether' ? 'We Need to Go Deeper' : 'Return to Overworld',
      newTheme === 'nether' ? <Flame className="text-white" /> : <Sun className="text-white" />
    );
  };

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = PROJECTS.filter(p => projectFilter === 'All' || p.type === projectFilter);

  // Group skills by category
  const skillsByCategory = {
    'Web Development': SKILLS.filter(s => s.category === 'Web'),
    'AI / ML': SKILLS.filter(s => s.category === 'AI / ML'),
    'Tools': SKILLS.filter(s => s.category === 'Tools'),
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (formStatus === "submitting") return;
  setFormStatus("submitting");

  const form = e.currentTarget;
  const data = new FormData(form);

  const payload = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Request failed");

    setFormStatus("success");
    triggerAchievement(
      "Getting an Upgrade",
      <Pickaxe className="text-white" />
    );

    form.reset();

    setTimeout(() => setFormStatus("idle"), 5000);
  } catch (err) {
    console.error("Contact submit failed:", err);
    setFormStatus("error");
  }
};


  return (
    <div className={`min-h-screen text-white selection:bg-green-500 selection:text-black relative overflow-x-hidden transition-colors duration-1000 ${theme === 'overworld' ? 'bg-dirt' : 'bg-nether'}`}>
      
      <ClickParticles />
      <BackgroundMusic />

      {achievement && (
        <AchievementToast 
          title={achievement.title} 
          icon={achievement.icon} 
          onClose={() => setAchievement(null)} 
        />
      )}
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 border-b-4 border-black shadow-lg bg-opacity-95 transition-colors duration-500 ${theme === 'overworld' ? 'bg-[#3a3a3a]' : 'bg-[#2a0a0a]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('about')}>
              <div className={`w-8 h-8 border-2 flex items-center justify-center transition-all duration-300 group-hover:rotate-12 ${theme === 'overworld' ? 'bg-green-600 border-green-800 hover:bg-green-500' : 'bg-red-700 border-red-900 hover:bg-red-600'}`}>
                 <span className="font-bold text-lg">S</span>
              </div>
              <span className="text-2xl tracking-widest text-yellow-400 drop-shadow-md group-hover:scale-105 transition-transform duration-200">AYUSHDEEP.SPACE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="ml-10 flex items-baseline space-x-8 text-xl">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-yellow-400 transition-all duration-300 px-3 py-2 relative group hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 group-hover:drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full box-shadow-sm"></span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={toggleTheme}
                className="ml-4 p-2 border-2 border-black bg-gray-700 hover:bg-gray-600 active:translate-y-1 transition-all"
                title={theme === 'overworld' ? "Go to Nether" : "Return to Overworld"}
              >
                {theme === 'overworld' ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-blue-300" />}
              </button>
            </div>
            
            <div className="md:hidden flex items-center gap-4">
               <button 
                onClick={toggleTheme}
                className="p-1"
              >
                {theme === 'overworld' ? <Sun size={24} className="text-yellow-300" /> : <Moon size={24} className="text-blue-300" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white transition-transform active:scale-90"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2b2b2b] border-b-4 border-black animate-in slide-in-from-top-10 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-xl">
               {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left hover:bg-[#3c3c3c] hover:text-yellow-400 px-3 py-4 border-b border-[#444] transition-colors active:pl-4"
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[90vh] text-center relative overflow-hidden">
        {theme === 'overworld' ? <ExperienceOrbs /> : (
          /* Nether Particles / Ash could go here, for now using ExperienceOrbs styled differently could work, or just let them be standard */
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-repeat animate-pulse" style={{backgroundImage: 'radial-gradient(circle, #ff0000 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        )}
        
        {/* Decorative blocks */}
        <div className={`absolute top-40 left-10 w-16 h-16 border-4 rotate-12 opacity-50 hidden md:block animate-float ${theme === 'overworld' ? 'bg-[#588d3e] border-[#3e662b]' : 'bg-[#8b0000] border-[#500000]'}`} style={{ animationDelay: '0s' }}></div>
        <div className={`absolute bottom-20 right-10 w-24 h-24 border-4 -rotate-6 opacity-50 hidden md:block animate-float ${theme === 'overworld' ? 'bg-[#7d7d7d] border-[#555]' : 'bg-[#4a0e0e] border-[#2a0505]'}`} style={{ animationDelay: '1.5s' }}></div>

        <div className={`z-10 bg-opacity-60 p-8 border-4 border-white backdrop-blur-sm max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300 shadow-2xl ${theme === 'overworld' ? 'bg-black' : 'bg-[#1a0505]'}`}>
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden animate-float">
             {PROFILE.imageUrl ? (
               <img src={PROFILE.imageUrl} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <User size={64} className="text-white" />
             )}
          </div>
          <h1 className="text-5xl md:text-7xl mb-4 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <span className={theme === 'overworld' ? "text-green-500" : "text-red-500"}>&lt;</span> Ayush Deep <span className={theme === 'overworld' ? "text-green-500" : "text-red-500"}>/&gt;</span>
          </h1>
          <h2 className="text-2xl md:text-4xl mb-8 drop-shadow-md h-10">
             <TypingText />
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting intelligent web applications and mining data for insights. 
            Level 67 in  Python.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MinecraftButton 
              onClick={() => scrollToSection('projects')}
              variant={theme === 'overworld' ? 'primary' : 'danger'}
            >
               View Projects
            </MinecraftButton>
            <MinecraftButton variant="secondary" onClick={() => scrollToSection('contact')}>
               Contact Me
            </MinecraftButton>
          </div>
          
          <div className="mt-12 flex justify-center gap-6">
            <a href="https://github.com/Ayush9791" onClick={() => triggerAchievement('Open Source Contributor', <Github className="text-white" />)} className="transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 bg-[#333] p-3 border-2 border-gray-500 hover:border-yellow-400 group shadow-lg active:scale-95">
              <Github size={32} className="group-hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ayush-deep979/" onClick={() => triggerAchievement('Networking Expert', <Linkedin className="text-white" />)} className="transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 bg-[#0077b5] p-3 border-2 border-blue-300 hover:border-white group shadow-lg active:scale-95">
              <Linkedin size={32} className="group-hover:text-white transition-colors" />
            </a>
            <a href="mailto:aayushdeep979@gmail.com" onClick={() => triggerAchievement('Message Sent', <Mail className="text-white" />)} className="transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 bg-[#ea4335] p-3 border-2 border-red-300 hover:border-white group shadow-lg active:scale-95">
              <Mail size={32} className="group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Inventory Section (Compact) */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default ${theme === 'overworld' ? 'bg-[#8B4513]' : 'bg-[#5c0000]'}`}>
              Inventory
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="bg-[#c6c6c6] border-4 border-[#373737] p-4 shadow-xl flex flex-col">
                <h3 className="text-[#373737] text-2xl mb-4 font-bold border-b-2 border-[#9e9e9e] pb-1">{category}</h3>
                
                {/* Inventory Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className={`
                        group relative bg-[#8b8b8b] border-2 border-b-white border-r-white border-t-[#373737] border-l-[#373737] 
                        aspect-square flex items-center justify-center cursor-pointer hover:bg-[#a0a0a0] transition-colors
                        ${skill.level >= 5 ? 'enchanted' : ''}
                      `}
                    >
                      <span className="text-2xl drop-shadow-md z-10">{skill.icon}</span>
                      
                      {/* Stack Count (Level) */}
                      <span className="absolute bottom-0 right-1 text-white text-xs font-bold drop-shadow-[1px_1px_0_#000] z-10">
                        {skill.level}
                      </span>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#100010] text-white border-2 border-[#2a002a] px-3 py-1 z-50 whitespace-nowrap hidden group-hover:block pointer-events-none animate-in fade-in slide-in-from-bottom-2 shadow-xl">
                        <p className={`${skill.level >= 5 ? 'text-purple-400' : 'text-white'}`}>{skill.name}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Fill empty slots */}
                  {Array.from({ length: Math.max(0, 5 - (skills.length % 5 === 0 ? 5 : skills.length % 5)) }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-[#8b8b8b] border-2 border-b-white border-r-white border-t-[#373737] border-l-[#373737] aspect-square opacity-50"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
             <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-default ${theme === 'overworld' ? 'bg-[#588d3e]' : 'bg-[#800000]'}`}>
              Achievements
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12 gap-4">
             {['All', 'AI', 'Web'].map((filter) => (
               <button
                 key={filter}
                 onClick={() => setProjectFilter(filter as any)}
                 className={`
                   font-['VT323'] text-2xl px-6 py-2 border-4 transition-all duration-200 ease-out
                   ${projectFilter === filter 
                     ? 'bg-blue-600 border-black text-white transform -translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,0.5)]' 
                     : 'bg-[#7d7d7d] border-[#424242] text-gray-200 hover:bg-[#9e9e9e] hover:-translate-y-1'}
                 `}
               >
                 {filter}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#c6c6c6] p-1 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.5)] hover:transform hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,0.5)] transition-all duration-300 animate-in fade-in zoom-in-95">
                <div className="border-4 border-[#ffffff] border-b-[#555555] border-r-[#555555] p-6 h-full flex flex-col">
                  <div className="relative mb-6 group overflow-hidden border-4 border-black bg-black">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-48 object-cover image-pixelated transform group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-yellow-400 px-3 py-1 border-2 border-yellow-600 font-bold">
                      {project.type}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl text-black mb-3 font-bold group-hover:text-blue-800 transition-colors">{project.title}</h3>
                  <p className="text-[#333] text-xl mb-6 flex-grow leading-tight">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-[#8b8b8b] text-black px-2 py-1 border-2 border-[#555] text-lg hover:bg-white transition-colors cursor-default hover:scale-105 transform duration-150 inline-block">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <MinecraftButton fullWidth variant={theme === 'overworld' ? 'primary' : 'danger'}>
                    Open Project
                  </MinecraftButton>
                </div>
              </div>
            ))}
          </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-5xl text-white drop-shadow-md mb-4">Book & Quill</h2>
             <p className="text-xl text-gray-300">Leave a message in my inventory.</p>
           </div>

           <div className="bg-[#fcf3cf] text-black p-8 md:p-12 shadow-2xl relative max-w-2xl mx-auto transform rotate-1 transition-transform hover:rotate-0 duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             {/* Book Look */}
             <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#e6d0a1] border-r border-[#d4b483]"></div>
             
             {formStatus === 'success' ? (
                <div className="ml-6 h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 border-4 border-green-700 animate-bounce">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-[#5c4033] mb-2">Achievement Get!</h3>
                  <p className="text-2xl text-[#8d6e63]">Message Sent Successfully.</p>
                </div>
             ) : (
               <form className="ml-6 space-y-6" onSubmit={handleContactSubmit}>
                 <div>
                   <label htmlFor="name" className="block text-2xl mb-2 font-bold text-[#5c4033]">Username</label>
                   <input 
                     required
                     type="text" 
                     id="name"
                     name="name"
                     className="w-full bg-transparent border-b-2 border-[#5c4033] focus:border-red-500 focus:outline-none text-xl p-2 font-['VT323'] placeholder-[#a1887f] transition-colors focus:bg-[#e6d0a1] bg-opacity-30"
                     placeholder="Steve"
                   />
                 </div>
                 
                 <div>
                   <label htmlFor="email" className="block text-2xl mb-2 font-bold text-[#5c4033]">Server Address (Email)</label>
                   <input 
                     required
                     type="email" 
                     id="email"
                      name="email"
                     className="w-full bg-transparent border-b-2 border-[#5c4033] focus:border-red-500 focus:outline-none text-xl p-2 font-['VT323'] focus:bg-[#e6d0a1] bg-opacity-30"
                     placeholder="herobrine@minecraft.net"
                   />
                 </div>
                 
                 <div>
                   <label htmlFor="message" className="block text-2xl mb-2 font-bold text-[#5c4033]">Message</label>
                   <textarea 
                     required
                     id="message"
                     name="message"
                     rows={4}
                     className="w-full bg-transparent border-2 border-[#5c4033] focus:border-red-500 focus:outline-none text-xl p-2 font-['VT323'] resize-none focus:bg-[#e6d0a1] bg-opacity-30"
                     placeholder="Write your message here..."
                   ></textarea>
                 </div>
                 
                 <div className="text-right">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="text-2xl font-bold text-[#5c4033] hover:text-red-600 flex items-center justify-end gap-2 group transition-all disabled:opacity-50 active:scale-95 duration-100"
                    >
                      <span>{formStatus === 'submitting' ? 'Signing...' : 'Sign & Close'}</span>
                      <Pickaxe className={`transform transition-transform ${formStatus === 'submitting' ? 'animate-bounce' : 'group-hover:rotate-45'}`} />
                    </button>
                 </div>
               </form>
             )}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] py-8 text-center border-t-4 border-[#333]">
        <p className="text-gray-500 text-lg">
          © {new Date().getFullYear()} Built with React & Diamonds.
        </p>
      </footer>

      <ChatBot />
    </div>
  );
}

export default App;