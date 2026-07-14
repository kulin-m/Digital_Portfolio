import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import contentData from '../data/content.json';

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="min-h-screen w-full flex items-center py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* On desktop, the left column is empty to allow the 3D Skill Orb to be visible.
            The text content sits in the right column. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Spacer for 3D Orb, but shows interactive hint on mobile) */}
          <div className="order-2 lg:order-1 h-[300px] lg:h-auto flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-2 rounded-lg border border-white/5 bg-[#060913]/30 backdrop-blur-sm lg:mt-24 pointer-events-auto"
            >
              <p className="text-xs font-inter text-gray-500 uppercase tracking-widest">
                Interactive 3D Workspace
              </p>
              <p className="text-xs font-inter text-cyanGlow/80 mt-1">
                Drag to rotate the core skill set orb
              </p>
            </motion.div>
          </div>

          {/* Right Column (Bio content) */}
          <div className="order-1 lg:order-2 flex flex-col space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-cyanGlow font-outfit">
                01 // PROFILE
              </span>
              <h2 className="font-outfit text-4xl md:text-5xl font-black mt-2 mb-6">
                About Me
              </h2>

              {/* Bio card */}
              <div className="glass-panel p-8 rounded-2xl mb-6">
                {Array.isArray(contentData.personal.bio) ? (
                  contentData.personal.bio.map((paragraph, idx) => (
                    <p key={idx} className="font-inter text-gray-300 leading-relaxed text-md mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="font-inter text-gray-300 leading-relaxed text-md">
                    {contentData.personal.bio}
                  </p>
                )}
              </div>

              {/* Grid of quick info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-cyanGlow/10 rounded-lg text-cyanGlow">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-gray-200">Education</h4>
                    <p className="font-inter text-xs text-gray-400 mt-1">
                      B.Tech CSE (AI/ML)<br />
                      Vellore Institute of Technology
                    </p>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-violetGlow/10 rounded-lg text-violetGlow">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-gray-200">Current GPA</h4>
                    <p className="font-inter text-xs text-gray-400 mt-1">
                      8.89 / 10<br />
                      VIT Chennai
                    </p>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-xl flex items-start gap-4 col-span-1 md:col-span-2">
                  <div className="p-3 bg-blueGlow/10 rounded-lg text-blueGlow">
                    <MapPin size={20} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 w-full">
                    <div>
                      <h4 className="font-outfit font-bold text-sm text-gray-200">Location</h4>
                      <p className="font-inter text-xs text-gray-400">Chennai, India</p>
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-sm text-gray-200">Email</h4>
                      <p className="font-inter text-xs text-gray-400">{contentData.personal.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
