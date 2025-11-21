import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Globe, 
  Circle,
  ArrowDown
} from 'lucide-react';

// --- Configuration & Data ---

const fontConfig = {
  logo: "'Pinyon Script', cursive", 
  body: "'Manrope', sans-serif",
};

const themeColor = '#9F86AA'; // The requested accent color

const projects = {
  archived: [
    { id: 'a1', name: 'Project Aether', year: '2021', type: 'Acquisition', desc: 'Decentralized liquidity protocol.' },
    { id: 'a2', name: 'Blue Horizon', year: '2020', type: 'Exit', desc: 'Maritime AI logistics.' },
    { id: 'a3', name: 'Velvet', year: '2018', type: 'Merger', desc: 'Invite-only creative social.' },
    { id: 'a4', name: 'Onyx', year: '2016', type: 'Dissolved', desc: 'Hardware wallet infrastructure.' },
  ],
  live: [
    { id: 'l1', name: 'Nisfaldam Core', status: 'Scaling', desc: 'Serverless ecosystem infrastructure.' },
    { id: 'l2', name: 'Echo Labs', status: 'Active', desc: 'Real-time voice synthesis engine.' },
    { id: 'l3', name: 'Vanta Black', status: 'Beta', desc: 'High-frequency trading algorithms.' },
  ],
  future: [
    { id: 'f1', name: 'Project Ocular', status: 'R&D', desc: 'Non-invasive retinal monitoring.' },
    { id: 'f2', name: 'The Spire', status: 'Planning', desc: 'Sustainable vertical micro-cities.' },
    { id: 'f3', name: 'Titan', status: 'Concept', desc: 'LEO commercial cargo transport.' },
  ]
};

// --- Components ---

const Navbar = ({ activePage, setPage, menuOpen, setMenuOpen }) => {
  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'archived', label: 'Archived' },
    { id: 'live', label: 'Live' },
    { id: 'future', label: 'Future' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-6 py-6 mix-blend-difference text-white">
        
        {/* Logo - Absolute positioned to left to allow centering of nav links */}
        <div className={`absolute left-6 transition-opacity duration-500 ${activePage === 'home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button 
              onClick={() => setPage('home')}
              className="text-2xl md:text-3xl lg:text-4xl cursor-pointer hover:opacity-80 transition-opacity"
              style={{ fontFamily: fontConfig.logo, color: themeColor }}
            >
              Nisfaldam
            </button>
        </div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex gap-8 lg:gap-12 items-center">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-xs uppercase tracking-[0.2em] pb-1 border-b border-transparent transition-all duration-300`}
              style={{ 
                fontFamily: fontConfig.body,
                borderColor: activePage === link.id ? 'rgba(255,255,255,0.5)' : 'transparent',
                opacity: activePage === link.id ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColor;
                e.currentTarget.style.opacity = '1';
                if (activePage !== link.id) e.currentTarget.style.borderColor = themeColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.opacity = activePage === link.id ? '1' : '0.5';
                if (activePage !== link.id) e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle - Absolute Right */}
        <button 
          className="md:hidden z-50 absolute right-6 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col justify-center px-8 animate-fadeIn">
          <div className="space-y-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setMenuOpen(false);
                }}
                className="block text-4xl md:text-5xl text-white text-left transition-all duration-300 font-light"
                style={{ fontFamily: fontConfig.body }}
                onMouseEnter={(e) => { e.currentTarget.style.color = themeColor; e.currentTarget.style.paddingLeft = '1rem'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.paddingLeft = '0'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => (
  <section className="flex-grow flex flex-col justify-center items-center bg-[#0a0a0a] text-[#f0f0f0] overflow-hidden relative min-h-[80dvh]">
    <div className="z-10 animate-slideUp" style={{ animationDelay: '0.1s' }}>
       <h1 className="text-[15vw] md:text-[12vw] lg:text-[150px] leading-none text-center select-none" 
          style={{ 
            fontFamily: fontConfig.logo, 
            color: themeColor
          }}>
        Nisfaldam
      </h1>
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/5 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
  </section>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-10 md:mb-16 border-b border-white/10 pb-4 md:pb-8">
    <h2 className="text-4xl md:text-6xl lg:text-8xl mb-2 md:mb-4 text-white font-light tracking-tight" style={{ fontFamily: fontConfig.body }}>{title}</h2>
    <p className="text-xs md:text-sm uppercase tracking-widest opacity-50 max-w-md">{subtitle}</p>
  </div>
);

const ListRow = ({ item, index, type }) => (
  <div 
    className="group relative py-6 md:py-8 border-b border-white/10 transition-colors duration-500 cursor-pointer hover:bg-white/5"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-4 px-2 md:px-4">
      <div className="flex items-baseline gap-4 md:gap-6 md:w-1/3">
        <span className="text-xs font-mono opacity-30">0{index + 1}</span>
        <h3 className="text-xl md:text-2xl lg:text-3xl text-white group-hover:translate-x-4 transition-transform duration-500 font-light transition-colors" 
            style={{ fontFamily: fontConfig.body }}
            onMouseEnter={(e) => e.currentTarget.style.color = themeColor}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          {item.name}
        </h3>
      </div>
      
      <div className="md:w-1/3">
        <p className="text-xs md:text-sm text-white/60 group-hover:text-white transition-colors">{item.desc}</p>
      </div>

      <div className="mt-2 md:mt-0 flex justify-between md:justify-end items-center gap-4 w-full md:w-auto">
        <span className={`text-[10px] md:text-xs px-2 py-1 rounded-full border ${
          type === 'future' ? 'border-purple-500/50 text-purple-300' :
          type === 'live' ? 'border-emerald-500/50 text-emerald-300' :
          'border-white/20 text-white/40'
        }`}>
          {item.status || item.year}
        </span>
        <ArrowUpRight className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" size={16} color={themeColor} />
      </div>
    </div>
  </div>
);

const ContentPage = ({ title, subtitle, items, type }) => (
  // Mobile: pt-24 (reduced padding), flex-col justify-center to fit screen
  <div className="flex-grow flex flex-col justify-center bg-[#0a0a0a] text-[#f0f0f0] pt-24 md:pt-32 px-6 pb-12 md:pb-20 animate-fadeIn">
    <div className="max-w-7xl mx-auto w-full">
      <SectionHeader title={title} subtitle={subtitle} />
      
      <div className="flex flex-col w-full">
        {items ? (
          items.map((item, idx) => (
            <ListRow key={item.id} item={item} index={idx} type={type} />
          ))
        ) : (
          // About Content
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            {/* Main Text Column */}
            <div className="md:col-span-8 space-y-6 md:space-y-10 text-lg md:text-2xl font-light leading-relaxed text-[#e0e0e0]">
              <p>
                nisfaldam studio was born from a passion for ideas that spark curiosity and challenge boundaries.
              </p>
              
              <p>
                every project i’ve taken on has come from genuine interest – if i don’t believe in an idea, i won’t pursue it.
                but when i do, i give it everything i have. i push myself until there’s nothing left to give — not for perfection, but for progress.
                whether the outcome is success or failure, every step is a lesson, a chance to grow, and a reminder to enjoy the process.
              </p>

              <p>
                my entrepreneurial path started with a small marketing agency – a project that taught me more than i could have expected: hr, project management, client acquisition, and the patience to balance them all.
                since then, i’ve carried those lessons into new ventures, driven by the belief that one day, one of these ideas will earn the recognition it deserves — maybe even an acquisition.
                that thought keeps me moving forward. failure doesn’t stop me; it only refines me.
              </p>

              <p>
                at nisfaldam studio, i value honesty, discipline, and progress — the ability to stay calm under pressure and keep working when it’s hardest to.
                these principles shape both my work and the way i collaborate.
                i believe in partnerships grounded in constructive dialogue, shared growth, and an ambition to build something meaningful.
              </p>

              <p>
                this platform isn’t here to sell anything.
                it’s here to show that with the right mindset and consistent effort, ideas can become real.
                if you’re an entrepreneur or a visionary who values resilience, clarity, and results – you’re in the right place.
              </p>

              <p className="text-[#9F86AA] italic">
                just know this – it’s possible.
              </p>
            </div>

            {/* Sidebar Column */}
            <div className="md:col-span-4 space-y-8 md:space-y-12 text-sm opacity-60 leading-loose border-l border-white/10 pl-6 md:pl-8 md:pt-2">
              <div>
                 <h4 className="uppercase tracking-widest mb-2 md:mb-4 text-xs text-white">Philosophy</h4>
                 <ul className="space-y-1 md:space-y-2">
                   <li>Honesty</li>
                   <li>Discipline</li>
                   <li>Progress</li>
                 </ul>
              </div>
              
              <div>
                <h4 className="uppercase tracking-widest mb-2 md:mb-4 text-xs text-white">Contact</h4>
                <p>hello@nisfaldam.com</p>
                <p>+1 (555) 092-1102</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="flex-grow flex items-center justify-center bg-[#0a0a0a] text-[#f0f0f0] pt-24 pb-12 md:pt-32 px-6 animate-fadeIn">
    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
      <div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl mb-6 md:mb-8 font-light tracking-tight" style={{ fontFamily: fontConfig.body }}>Get in Touch</h1>
        <p className="text-lg md:text-xl opacity-60 mb-8 md:mb-12">
          We are always looking for the next impossible problem. 
          <br/>Tell us yours.
        </p>
        <div className="space-y-4">
          <div 
            className="flex items-center gap-4 opacity-50 cursor-pointer transition-all duration-300"
            onMouseEnter={(e) => { e.currentTarget.style.color = themeColor; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.opacity = '0.5'; }}
          >
            <Globe size={20} /> <span>www.nisfaldam.com</span>
          </div>
          <div 
            className="flex items-center gap-4 opacity-50 cursor-pointer transition-all duration-300"
            onMouseEnter={(e) => { e.currentTarget.style.color = themeColor; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.opacity = '0.5'; }}
          >
            <Circle size={20} /> <span>New York • London • Tokyo</span>
          </div>
        </div>
      </div>

      <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest opacity-50">Identity</label>
          <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 outline-none transition-colors text-base md:text-lg" 
            placeholder="Name / Organization"
            onFocus={(e) => e.target.style.borderColor = themeColor}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest opacity-50">Coordinates</label>
          <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 outline-none transition-colors text-base md:text-lg" 
            placeholder="Email Address" 
            onFocus={(e) => e.target.style.borderColor = themeColor}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest opacity-50">Transmission</label>
          <textarea rows="3" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 outline-none transition-colors text-base md:text-lg resize-none" 
            placeholder="Message content..."
            onFocus={(e) => e.target.style.borderColor = themeColor}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
          ></textarea>
        </div>
        <button 
          className="mt-6 md:mt-8 px-8 py-4 border border-white/20 transition-all duration-300 uppercase tracking-widest text-xs"
          onMouseEnter={(e) => {
            e.target.style.borderColor = themeColor;
            e.target.style.backgroundColor = themeColor;
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'white';
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
);

const Footer = () => (
  <footer className="py-8 text-center bg-[#0a0a0a] text-white/20 text-[10px] uppercase tracking-[0.2em] mt-auto">
    <span>&copy; Nisfaldam</span>
  </footer>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    // Use min-h-[100dvh] to fix mobile browser bar issues
    <div className="bg-[#0a0a0a] min-h-[100dvh] text-white selection:bg-white selection:text-black overflow-x-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;600&family=Pinyon+Script&display=swap');
        
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideUp { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

      <Navbar activePage={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="flex-grow flex flex-col relative w-full">
        {page === 'home' && <Hero />}
        
        {page === 'about' && (
          <ContentPage 
            title="About Us" 
            subtitle="Manifesto" 
          />
        )}
        
        {page === 'archived' && (
          <ContentPage 
            title="Archive" 
            subtitle="Past Ventures & Exits" 
            items={projects.archived} 
            type="archived"
          />
        )}
        
        {page === 'live' && (
          <ContentPage 
            title="Live Ventures" 
            subtitle="Current Portfolio Ecosystem" 
            items={projects.live} 
            type="live"
          />
        )}
        
        {page === 'future' && (
          <ContentPage 
            title="Future" 
            subtitle="Research & Development" 
            items={projects.future} 
            type="future"
          />
        )}
        
        {page === 'contact' && <Contact />}
      </main>
      
      <Footer />
    </div>
  );
}