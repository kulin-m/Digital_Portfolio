import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCw, Layers, CheckCircle2, ChevronRight, Award, ExternalLink } from 'lucide-react';
import contentData from '../data/content.json';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

// Accent colors cycling for project cards
const accents = [
  { tag: '#00f2fe', tagBg: 'rgba(0,242,254,0.1)', border: 'rgba(0,242,254,0.3)', shadow: '0 0 20px rgba(0,242,254,0.15)' },
  { tag: '#7f00ff', tagBg: 'rgba(127,0,255,0.1)', border: 'rgba(127,0,255,0.3)', shadow: '0 0 20px rgba(127,0,255,0.15)' },
  { tag: '#4facfe', tagBg: 'rgba(79,172,254,0.1)', border: 'rgba(79,172,254,0.3)', shadow: '0 0 20px rgba(79,172,254,0.15)' },
];

export default function Projects() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="projects" className="min-h-screen w-full flex items-center py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ zIndex: 10, position: 'relative' }}>

        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest"
            style={{ color: '#00f2fe', fontFamily: 'Outfit, sans-serif' }}>
            03 // PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Featured Projects
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Click on any card to expand its details and see the full technical breakdown.
          </p>
        </div>

        {/* Project cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {contentData.projects.map((project, idx) => {
            const accent = accents[idx % accents.length];
            const isExpanded = expandedIdx === idx;

            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="glass-panel rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded"
                          style={{ color: accent.tag, background: accent.tagBg }}>
                          {project.tech[0]}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">{project.period}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-white/10 hover:border-white/30 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                      >
                        <GithubIcon size={18} />
                      </a>
                      <button
                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                        className="flex items-center gap-1 text-xs uppercase px-4 py-2 rounded-lg font-semibold transition-all"
                        style={{
                          fontFamily: 'Outfit, sans-serif',
                          background: `linear-gradient(135deg, ${accent.tag}dd, ${accent.tag}88)`,
                          color: '#0a0e1a',
                        }}
                      >
                        Details
                        <ChevronRight size={14} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full border border-white/5 bg-white/5 text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable detail panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 overflow-hidden"
                      style={{ background: 'rgba(6,9,19,0.5)' }}
                    >
                      <div className="p-6 md:p-8">
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                          style={{ color: accent.tag, fontFamily: 'Outfit, sans-serif' }}>
                          <Layers size={16} />
                          Key Highlights
                        </h4>
                        <ul className="text-xs md:text-sm text-gray-400 space-y-2 list-disc list-inside leading-relaxed"
                          style={{ fontFamily: 'Inter, sans-serif' }}>
                          {project.points.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
