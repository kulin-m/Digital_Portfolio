import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Gamepad2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import contentData from '../data/content.json';

export default function Experience() {
  const timelineData = [
    {
      type: 'work',
      role: contentData.experience[0].role,
      organization: contentData.experience[0].company,
      location: contentData.experience[0].location,
      period: contentData.experience[0].period,
      details: contentData.experience[0].details,
      icon: <Terminal size={16} />
    },
    {
      type: 'involvement',
      role: contentData.involvement[0].role,
      organization: contentData.involvement[0].organization,
      location: "VIT Chennai",
      period: contentData.involvement[0].period,
      details: contentData.involvement[0].details,
      icon: <Gamepad2 size={16} />
    },
    {
      type: 'education',
      role: contentData.education[0].degree,
      organization: contentData.education[0].institution,
      location: contentData.education[0].location,
      period: contentData.education[0].period,
      details: [contentData.education[0].grade],
      icon: <GraduationCap size={16} />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="min-h-screen w-full flex items-center py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Empty on desktop to allow 3D Helix timeline to shine) */}
          <div className="lg:col-span-4 h-[100px] lg:h-auto pointer-events-none" />

          {/* Right Column (Timeline feed) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-cyanGlow font-outfit">
                04 // TIMELINE
              </span>
              <h2 className="font-outfit text-4xl md:text-5xl font-black mt-2 mb-8">
                Experience & Education
              </h2>
            </div>

            {/* Vertically stacked cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-6 md:pl-10 border-l border-white/5 space-y-8"
            >
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="relative group"
                >
                  {/* Icon Node marker on the left border */}
                  <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border border-white/10 group-hover:border-cyanGlow flex items-center justify-center text-gray-400 group-hover:text-cyanGlow transition-colors duration-300 shadow-glass">
                    {item.icon}
                  </div>

                  <div className="glass-panel p-6 md:p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                      <div>
                        <h3 className="font-outfit text-xl font-bold text-white group-hover:text-cyanGlow transition-colors duration-300">
                          {item.role}
                        </h3>
                        <p className="font-inter text-sm font-semibold text-gray-300 mt-1">
                          {item.organization}
                        </p>
                      </div>
                      
                      {/* Meta chips */}
                      <div className="flex flex-wrap gap-2 text-xs font-inter font-medium text-gray-400">
                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded">
                          <Calendar size={12} className="text-cyanGlow" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded">
                          <MapPin size={12} className="text-violetGlow" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <ul className="text-xs md:text-sm font-inter text-gray-400 space-y-2 list-disc list-inside leading-relaxed">
                      {item.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
