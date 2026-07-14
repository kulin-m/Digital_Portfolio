import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import contentData from '../data/content.json';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Determine scrolled status for background styling
      setScrolled(window.scrollY > 50);

      // ScrollSpy: identify which section is currently active
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#060913]/70 backdrop-blur-md border-b border-white/5 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => scrollTo('home')}
          className="font-outfit font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-violetGlow"
        >
          KULIN MATHUR
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-inter text-sm font-medium tracking-wide transition-colors relative py-1 ${
                activeSection === item.id 
                  ? 'text-cyanGlow' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyanGlow shadow-cyanShadow rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Social Icons & Action */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={contentData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={contentData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>

          <button 
            onClick={() => scrollTo('contact')}
            className="font-outfit font-bold text-xs uppercase px-4 py-2 border border-cyanGlow/40 rounded text-cyanGlow hover:bg-cyanGlow/10 transition-all duration-300 shadow-cyanShadow/20"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bg-[#060913]/95 backdrop-blur-lg border-b border-white/5 py-6 px-8 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left font-outfit text-lg font-semibold ${
                activeSection === item.id ? 'text-cyanGlow' : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center space-x-6 pt-4 border-t border-white/5">
            <a href={contentData.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-400">
              <GithubIcon size={22} />
            </a>
            <a href={contentData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400">
              <LinkedinIcon size={22} />
            </a>

          </div>
        </div>
      )}
    </nav>
  );
}
