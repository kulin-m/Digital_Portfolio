import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Award } from 'lucide-react';
import contentData from '../data/content.json';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!form.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      
      // Reset success notification after a few seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen w-full flex items-center py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyanGlow font-outfit">
            05 // GET IN TOUCH
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-black mt-2">
            Certifications & Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Certifications & Languages (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Certifications Card */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              <h3 className="font-outfit text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Award className="text-cyanGlow" size={20} />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {contentData.certifications.map((cert) => (
                  <div key={cert.title} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                    <h4 className="font-outfit font-semibold text-sm text-gray-200">{cert.title}</h4>
                    <p className="font-inter text-xs text-gray-400 mt-0.5">{cert.provider} — {cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              <a href="mailto:mathurkulin04@gmail.com" className="inline-block hover:opacity-80 transition-opacity">
                <h3 className="font-outfit text-xl font-bold mb-6 text-white hover:text-cyanGlow transition-colors flex items-center gap-2">
                  Send a Message
                  <Mail size={20} className="text-cyanGlow" />
                </h3>
              </a>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col space-y-2">
                  <label className="font-outfit text-xs font-semibold text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`bg-white/5 border rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-cyanGlow ${
                      errors.name ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="text-[10px] text-red-400 font-inter">{errors.name}</span>}
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-outfit text-xs font-semibold text-gray-400">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`bg-white/5 border rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-cyanGlow ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="name@email.com"
                  />
                  {errors.email && <span className="text-[10px] text-red-400 font-inter">{errors.email}</span>}
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-outfit text-xs font-semibold text-gray-400">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`bg-white/5 border rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-cyanGlow resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    placeholder="How can we collaborate?"
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-inter">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 font-outfit font-bold text-sm bg-gradient-to-r from-cyanGlow to-blueGlow text-slate-900 py-3 rounded-xl hover:shadow-cyanShadow transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Transmission
                    </>
                  )}
                </button>
              </form>

              {/* Toast notifications */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="mt-4 p-4 rounded-xl border border-green-500/30 bg-green-950/20 text-green-300 text-xs font-inter flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    Message sent successfully! I will get back to you shortly.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-xs text-gray-500 font-inter border-t border-white/5 pt-8">
          <p>© {new Date().getFullYear()} Kulin Mathur. Built with React, Vite, Three.js, and Tailwind CSS.</p>
        </div>

      </div>
    </section>
  );
}
