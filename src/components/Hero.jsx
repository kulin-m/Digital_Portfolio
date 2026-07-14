import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, ArrowRight } from 'lucide-react';
import contentData from '../data/content.json';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background radial gradient to enhance contrast on the 3D background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060913_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <motion.div 
            variants={itemVariants}
            className="px-3 py-1 rounded-full border border-cyanGlow/30 bg-cyanGlow/5 text-cyanGlow text-xs uppercase tracking-widest font-semibold mb-6 shadow-cyanShadow/10"
          >
            Specializing in Artificial Intelligence & Machine Learning
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-outfit text-5xl md:text-8xl font-black tracking-tight mb-4"
          >
            <span className="text-white">KULIN </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-violetGlow">
              MATHUR
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-outfit text-xl md:text-2xl font-medium text-gray-300 mb-6"
          >
            {contentData.personal.title} @ VIT Chennai
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-inter text-md md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
          >
            "{contentData.personal.tagline}"
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyanGlow to-blueGlow text-slate-900 font-outfit font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-cyanShadow"
            >
              View Projects
              <ArrowRight size={18} />
            </button>
            
            {/* Download Resume Button pointing to placeholder or standard action */}
            <a
              href="/resume.pdf"
              download="Kulin_Mathur_Resume.pdf"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-cyanGlow bg-white/5 hover:bg-cyanGlow/5 text-white font-outfit font-bold px-8 py-4 rounded-full transition-all duration-300"
            >
              <FileText size={18} className="text-cyanGlow" />
              Download Resume
            </a>
          </motion.div>

          {/* Floating Social Icons */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-6 text-gray-400 hover:text-white"
          >
            <a href={contentData.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyanGlow transition-colors">
              <GithubIcon size={24} />
            </a>
            <a href={contentData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-violetGlow transition-colors">
              <LinkedinIcon size={24} />
            </a>

          </motion.div>
        </motion.div>
      </div>

      {/* Floating mouse scroll indicator */}
      <div className="absolute bottom-10 left-50 transform -translateX-50 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-75 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-cyanGlow" />
        </motion.div>
      </div>
    </section>
  );
}
