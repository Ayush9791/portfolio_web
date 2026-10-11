import React, { useState, useEffect } from 'react';
import { Menu, X, Github as GithubIcon, Linkedin as LinkedinIcon, Mail, Pickaxe, User, CheckCircle, Sun, Moon, Flame } from 'lucide-react';
import { PROJECTS, SKILLS, PROFILE } from './constants';
import { BLOG_POSTS } from './blogPosts';
import MinecraftButton from './components/MinecraftButton';
import { TypingText } from './components/TypingText';
import { ExperienceOrbs } from './components/ExperienceOrbs';
import { AchievementToast } from './components/AchievementToast';
import { ClickParticles } from './components/ClickParticles';
import { BackgroundMusic } from './components/BackgroundMusic';
import { GitHubActivity } from './components/GitHubActivity';

type Theme = 'overworld' | 'nether';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'All' | 'ACTIVE QUEST' | 'FINISHED'>('All');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

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
      <ExperienceOrbs key={theme} theme={theme} />

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
              <span className="text-base sm:text-2xl tracking-wide sm:tracking-widest text-yellow-400 drop-shadow-md group-hover:scale-105 transition-transform duration-200">AYUSHDEEP.SPACE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="ml-10 flex items-baseline space-x-8 text-xl">
                {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
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
               {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item) => (
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
      <section id="about" className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[90vh] text-center relative ">
      
        {/* Decorative blocks */}
        <div className={`absolute top-40 left-10 w-16 h-16 border-4 rotate-12 opacity-50 hidden md:block animate-float ${theme === 'overworld' ? 'bg-[#588d3e] border-[#3e662b]' : 'bg-[#8b0000] border-[#500000]'}`} style={{ animationDelay: '0s' }}></div>
        <div className={`absolute bottom-20 right-10 w-24 h-24 border-4 -rotate-6 opacity-50 hidden md:block animate-float ${theme === 'overworld' ? 'bg-[#7d7d7d] border-[#555]' : 'bg-[#4a0e0e] border-[#2a0505]'}`} style={{ animationDelay: '1.5s' }}></div>

        <div className={`z-10 bg-opacity-60 p-8 border-4 border-white backdrop-blur-sm max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300 shadow-2xl ${theme === 'overworld' ? 'bg-black' : 'bg-[#1a0505]'}`}>
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden animate-float">
             {PROFILE.imageUrl ? (
               <img src={PROFILE.imageUrl} alt="Ayush Deep profile photo" className="w-full h-full object-cover" />
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
            Building web applications, AI/ML projects, and developer tools with a focus on practical problem-solving.
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
            <a href="https://github.com/Ayush9791" onClick={() => triggerAchievement('Open Source Contributor', <GithubIcon className="text-white" />)} className="transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 bg-[#333] p-3 border-2 border-gray-500 hover:border-yellow-400 group shadow-lg active:scale-95">
              <GithubIcon size={32} className="group-hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ayush-deep979/" onClick={() => triggerAchievement('Networking Expert', <LinkedinIcon className="text-white" />)} className="transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 bg-[#0077b5] p-3 border-2 border-blue-300 hover:border-white group shadow-lg active:scale-95">
              <LinkedinIcon size={32} className="group-hover:text-white transition-colors" />
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

      {/* Now Building */}
      <section id="building" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] ${theme === 'overworld' ? 'bg-[#8B4513]' : 'bg-[#5c0000]'}`}>Now Building</h2>
            <p className="text-xl text-gray-200 mt-5">Current experiments and projects in active development.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'ParkinsonAI (PENScan)', stage: 'Research & feature engineering', detail: 'Preprocessing spiral and meander drawings and evaluating interpretable machine-learning features.', tags: ['Python', 'OpenCV', 'Machine Learning'] },
              { title: 'LearnTrack Pro', stage: 'Product development', detail: 'A learning tracker for playlist-based study goals, session tracking, and progress history.', tags: ['Next.js', 'Supabase', 'YouTube API'] },
              { title: 'AI Internship & Job Tracker', stage: 'Agent workflow development', detail: 'Exploring a workflow that finds opportunities, matches them to a profile, and helps organize applications.', tags: ['Python', 'LLMs', 'Automation'] },
            ].map((item) => (
              <article key={item.title} className="bg-[#c6c6c6] text-black border-4 border-black p-5 shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                <p className="text-[#246b22] text-lg font-bold mb-2">IN PROGRESS</p>
                <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#5c4033] text-lg font-bold mb-3">{item.stage}</p>
                <p className="text-xl leading-tight mb-4">{item.detail}</p>
                <div className="flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="bg-[#8b8b8b] border-2 border-[#555] px-2 py-1 text-lg">{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
             <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-default ${theme === 'overworld' ? 'bg-[#588d3e]' : 'bg-[#800000]'}`}>
              Quests
            </h2>
          </div>

          {/* Compact project filters */}
          <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <label htmlFor="project-filter" className="text-xl text-white">Filter quests</label>
            <select
              id="project-filter"
              value={projectFilter}
              onChange={(event) => {
                setProjectFilter(event.target.value as 'All' | 'ACTIVE QUEST' | 'FINISHED');
                setShowAllProjects(false);
              }}
              className="font-['VT323'] text-xl bg-[#292929] text-white border-4 border-[#777] px-4 py-2 focus:outline-none focus:border-yellow-400"
            >
              <option value="All">All projects ({PROJECTS.length})</option>
              <option value="ACTIVE QUEST">In progress ({PROJECTS.filter(p => p.type === 'ACTIVE QUEST').length})</option>
              <option value="FINISHED">Completed ({PROJECTS.filter(p => p.type === 'FINISHED').length})</option>
            </select>
            <p className="text-gray-200 text-lg text-center sm:text-left" aria-live="polite">
              {showAllProjects
                ? `Showing all ${filteredProjects.length} matching projects`
                : `Showing ${Math.min(4, filteredProjects.length)} of ${filteredProjects.length} matching projects`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
            {visibleProjects.map((project) => (
              <div key={project.id} className="group bg-[#c6c6c6] p-1 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.5)] hover:transform hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,0.5)] transition-all duration-300 animate-in fade-in zoom-in-95">
                <div className="border-4 border-[#ffffff] border-b-[#555555] border-r-[#555555] p-6 h-full flex flex-col">
          
                  <div
                    className="relative mb-6 h-48 overflow-hidden border-4 border-black flex items-center justify-center text-center p-5"
                    role="img"
                    aria-label={`${project.title} project cover`}
                    style={{
                      background: project.badge.some((badge) => badge.toLowerCase() === 'ai')
                        ? 'linear-gradient(135deg, #312e81, #111827 70%)'
                        : project.badge.some((badge) => badge.toLowerCase() === 'discord')
                          ? 'linear-gradient(135deg, #5865F2, #23272A 75%)'
                          : 'linear-gradient(135deg, #166534, #111827 75%)',
                    }}
                  >
                    <div className="absolute inset-2 border-2 border-white/20 pointer-events-none" />
                    <div className="relative z-10 max-w-full">
                      <Pickaxe size={28} className="mx-auto mb-3 text-yellow-300" aria-hidden="true" />
                      <p className="text-yellow-300 text-sm tracking-widest mb-2">PROJECT {String(project.id).padStart(2, '0')}</p>
                      <p className="text-white text-2xl sm:text-3xl leading-tight font-bold drop-shadow-md">{project.title}</p>
                      <p className="mt-3 text-white/75 text-lg">{project.tags.slice(0, 3).join(' · ')}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 text-yellow-300 px-2 py-1 border-2 border-yellow-600 text-sm font-bold">
                      {project.type}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.badge.map((badge, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-[#555555] text-white border-2 border-[#333333] hover:bg-[#777] transition-colors cursor-default inline-block">
                        {badge}
                      </span>
                    ))}
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
                  
                  <MinecraftButton
                    fullWidth
                    variant={theme === 'overworld' ? 'primary' : 'danger'}
                    disabled={!project.link}
                    onClick={() => {
                      if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer');
                    }}
                    title={project.link ? `Open ${project.title} repository` : 'No public project link has been added yet'}
                  >
                    {project.link ? 'Open Repository' : project.type === 'ACTIVE QUEST' ? 'In Progress' : 'Repository Unavailable'}
                  </MinecraftButton>
                </div>
              </div>
            ))}
          </div>
          {filteredProjects.length > 4 && (
            <div className="mt-10 flex justify-center">
              <MinecraftButton
                variant={theme === 'overworld' ? 'secondary' : 'danger'}
                onClick={() => setShowAllProjects(value => !value)}
                aria-expanded={showAllProjects}
              >
                {showAllProjects ? 'Show Featured Projects' : `View All ${filteredProjects.length} Matching Projects`}
              </MinecraftButton>
            </div>
          )}
         </div>
      </section>

      {/* Developer Blog / Dev Logs */}
      <section id="blog" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 ${theme === 'overworld' ? 'bg-[#8B4513]' : 'bg-[#5c0000]'}`}>
              Dev Logs
            </h2>
            <p className="text-xl text-gray-200 mt-5">Build notes, experiments, and lessons from projects in progress.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="bg-[#f4e7bd] text-[#2d2119] border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,0.5)] p-5 flex flex-col">
                <p className="text-base text-[#655344] mb-2">{new Date(post.date + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}</p>
                <h3 className="text-3xl font-bold leading-tight mb-3">{post.title}</h3>
                <p className="text-xl leading-tight mb-4 flex-grow">{post.summary}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-[#d1c3a0] border border-[#87765d] px-2 py-1 text-base">{tag}</span>
                  ))}
                </div>
                <a href={post.url} className="block text-center bg-[#588d3e] hover:bg-[#6ab04c] text-white border-2 border-[#2e4b21] px-4 py-2 text-2xl transition-colors">
                  Read Dev Log →
                </a>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/blog/" className="inline-block bg-[#7d7d7d] hover:bg-[#9e9e9e] text-white border-4 border-[#424242] px-6 py-2 text-2xl">Open Blog Archive</a>
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section id="github-activity" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className={`text-5xl inline-block border-4 border-black px-8 py-2 text-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] ${theme === 'overworld' ? 'bg-[#588d3e]' : 'bg-[#800000]'}`}>GitHub Activity</h2>
            <p className="text-xl text-gray-200 mt-5">Recent public events from my GitHub profile.</p>
          </div>
          <GitHubActivity />
          <div className="text-center mt-8"><a href="https://github.com/Ayush9791" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#292929] hover:bg-[#444] text-white border-4 border-black px-6 py-2 text-2xl">View GitHub Profile →</a></div>
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
                     maxLength={100}
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
                     maxLength={254}
                     type="email" 
                     id="email"
                      name="email"
                     className="w-full bg-transparent border-b-2 border-[#5c4033] focus:border-red-500 focus:outline-none text-xl p-2 font-['VT323'] placeholder-[#a1887f] transition-colors focus:bg-[#e6d0a1] bg-opacity-30"
                     placeholder="herobrine@minecraft.net"
                   />
                 </div>
                 
                 <div>
                   <label htmlFor="message" className="block text-2xl mb-2 font-bold text-[#5c4033]">Message</label>
                   <textarea 
                     required
                     maxLength={3000}
                     id="message"
                     name="message"
                     rows={4}
                     className="w-full bg-transparent border-b-2 border-[#5c4033] focus:border-red-500 focus:outline-none text-xl p-2 font-['VT323'] placeholder-[#a1887f] transition-colors focus:bg-[#e6d0a1] bg-opacity-30"
                     placeholder="Write your message here..."
                   ></textarea>
                 </div>
                 
                 {formStatus === 'error' && (
                   <p role="alert" className="text-lg text-red-700 font-bold" aria-live="polite">
                     The message could not be sent. Please try again or email aayushdeep979@gmail.com directly.
                   </p>
                 )}
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

    </div>
  );
}

export default App;