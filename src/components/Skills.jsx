import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BrainCircuit, Cpu, Library } from 'lucide-react';
import contentData from '../data/content.json';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('AI_ML');

  const categories = [
    { id: 'AI_ML', label: 'AI & ML', icon: <BrainCircuit size={18} /> },
    { id: 'Languages', label: 'Languages', icon: <Code2 size={18} /> },
    { id: 'Frameworks_Tools', label: 'Frameworks & Tools', icon: <Library size={18} /> },
    { id: 'Core_CS', label: 'Core CS', icon: <Cpu size={18} /> }
  ];

  const skillList = contentData.skills[activeTab] || [];

  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="min-h-screen w-full flex items-center py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest font-outfit"
                style={{ color: '#00f2fe' }}>
                02 // EXPERTISE
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Technical Skills
              </h2>
            </div>

            {/* Tab headers */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                    activeTab === cat.id
                      ? 'border-[#00f2fe]/40 text-[#00f2fe]'
                      : 'border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    ...(activeTab === cat.id ? {
                      background: 'linear-gradient(135deg, rgba(0,242,254,0.15), rgba(79,172,254,0.15))',
                      boxShadow: '0 0 20px rgba(0,242,254,0.1)'
                    } : {
                      background: 'rgba(255,255,255,0.03)'
                    })
                  }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skills grid as tags */}
            <div className="glass-panel p-8 rounded-2xl min-h-[200px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-3 w-full"
                >
                  {skillList.map((skill, index) => (
                    <motion.span
                      key={skill}
                      variants={itemVariants}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 cursor-default transition-all duration-300 hover:scale-105"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        background: index % 2 === 0
                          ? 'linear-gradient(135deg, rgba(0,242,254,0.08), rgba(0,242,254,0.02))'
                          : 'linear-gradient(135deg, rgba(127,0,255,0.08), rgba(127,0,255,0.02))',
                        color: index % 2 === 0 ? '#00f2fe' : '#c084fc',
                        borderColor: index % 2 === 0 ? 'rgba(0,242,254,0.2)' : 'rgba(127,0,255,0.2)',
                      }}
                      whileHover={{
                        boxShadow: index % 2 === 0
                          ? '0 0 15px rgba(0,242,254,0.2)'
                          : '0 0 15px rgba(127,0,255,0.2)',
                        borderColor: index % 2 === 0 ? 'rgba(0,242,254,0.5)' : 'rgba(127,0,255,0.5)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right spacer for 3D */}
          <div className="lg:col-span-5 h-[200px] lg:h-auto pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
