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
  logo: "'Ballet', cursive", 
  body: "'Manrope', sans-serif",
};

const themeColor = '#9F86AA'; // The requested accent color

const projects = {
  archived: [
    { id: 'a1', name: '20sClub', year: '2021-2022', desc: 'Resale Market Platform' },
    { id: 'a2', name: 'Elbrus Media', year: '2022-2023', desc: 'Marketing Agency' },
    { id: 'a3', name: 'Infernal', year: '2018-2023', desc: 'Clothing Brand' },
  ],
  live: [
    { id: 'l1', name: 'ollimp', status: 'since 2023', desc: 'consulting agency' },
    { id: 'l2', name: 'Nisfaldam', status: 'since 2020', desc: 'Portfolio Project' },
    { id: 'l3', name: 'Chronically', status: 'since 2025', desc: 'Newsletter' },
  ],
  future: []
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
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-300`}
              style={{ 
                fontFamily: fontConfig.body,
                opacity: activePage === link.id ? 1 : 0.5,
                color: activePage === link.id ? themeColor : 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColor;
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = activePage === link.id ? themeColor : 'white';
                e.currentTarget.style.opacity = activePage === link.id ? '1' : '0.5';
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
        <span className={`text-[10px] md:text-xs uppercase tracking-widest ${
          type === 'future' ? 'text-purple-300' :
          type === 'live' ? 'text-emerald-300' :
          'text-white/40'
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
        ) : type === 'future' ? (
          // Future Content
          <div className="max-w-4xl space-y-6 md:space-y-10 text-lg md:text-2xl font-light leading-relaxed text-[#e0e0e0] animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <p>
              at nisfaldam, I believe in the strength of silence and the discipline of focused work.
            </p>
            <p>
              when there’s something truly worth sharing, you’ll be the first to know.
            </p>
            <p>
              until then, I let our actions speak — not our words.
            </p>
          </div>
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
  <div className="flex-grow flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f0f0f0] pt-24 pb-12 md:pt-32 px-6 animate-fadeIn">
    <div className="max-w-3xl mx-auto w-full text-center space-y-16">
      <div className="space-y-12">
        <div>
          <a 
            href="mailto:contact@nisfaldam.com"
            className="text-2xl md:text-4xl lg:text-5xl font-light transition-all duration-300 relative inline-block group"
            onMouseEnter={(e) => { e.currentTarget.style.color = themeColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}
          >
            contact@nisfaldam.com
            <span className="absolute -bottom-2 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: themeColor }}></span>
          </a>
        </div>

        <div className="pt-12 border-t border-white/10">
          <p className="text-lg md:text-xl font-light text-[#e0e0e0]">
            you can also view my work portfolio here: 
            <br className="md:hidden" />
            <a 
              href="https://adamalabed.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 ml-2 transition-all duration-300 group hover:opacity-80"
              style={{ color: themeColor }}
            >
              link <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </p>
        </div>
      </div>
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

  // NEW: Effect to color the mobile browser address bar/status bar
  useEffect(() => {
    // 1. Set 'theme-color' for Android & iOS 15+
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = '#0a0a0a';

    // 2. Set legacy iOS status bar style
    let metaAppleStatus = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");
    if (!metaAppleStatus) {
      metaAppleStatus = document.createElement('meta');
      metaAppleStatus.name = 'apple-mobile-web-app-status-bar-style';
      document.head.appendChild(metaAppleStatus);
    }
    metaAppleStatus.content = 'black-translucent';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    // Use min-h-[100dvh] to fix mobile browser bar issues
    <div className="bg-[#0a0a0a] min-h-[100dvh] text-white selection:bg-white selection:text-black overflow-x-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&family=Manrope:wght@200;300;400;600&display=swap');
        
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
            type="future"
          />
        )}
        
        {page === 'contact' && <Contact />}
      </main>
      
      <Footer />
    </div>
  );
}