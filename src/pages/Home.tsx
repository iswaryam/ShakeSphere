import React from 'react';
import { NetworkGraph } from '../components/NetworkGraph';
import { ContentSections } from '../components/ContentSections';
import { CurrentEvents } from '../components/CurrentEvents';
import { Resources } from '../components/Resources';
import { motion } from 'motion/react';
import { ScrollText, Github, Twitter, Languages, Globe, Sparkles, Book, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-amber-500/30 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfaf1]/80 backdrop-blur-md border-b border-[#d4c5a9]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="text-amber-800" size={24} />
            <span className="font-serif text-xl font-bold text-stone-900 tracking-tight">ShakeSphere</span>
          </div>
          <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-stone-600">
            <div className="hidden md:flex items-center gap-8">
              <a href="#viz" className="hover:text-amber-900 transition-colors flex items-center gap-1.5 font-serif"><Sparkles size={14} /> The Motif Graph</a>
              <a href="#language" className="hover:text-amber-900 transition-colors flex items-center gap-1.5 font-serif"><Languages size={14} /> Vocabulary</a>
              <a href="#events" className="hover:text-amber-900 transition-colors flex items-center gap-1.5 font-serif"><Globe size={14} /> Live Archive</a>
            </div>
            <Link to="/kids" className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full transition-all flex items-center gap-1.5 font-serif relative group border border-amber-200">
              <Star size={14} className="fill-amber-500 text-amber-500" /> Kids Mode
              <span className="absolute -top-2 -right-2 px-1 rounded bg-amber-500 text-[8px] text-white font-bold animate-pulse">NEW!</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-stone-500 hover:text-stone-900 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold text-stone-900 leading-tight"
          >
            ShakeSphere
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-serif italic"
          >
            Explore the interconnected universe of William Shakespeare. From 16th-century plays to modern-day adaptations and the global stage.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
        {/* Visualization Section */}
        <section id="viz" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                <Book size={14} />
                Knowledge Graph
              </div>
              <h2 className="text-4xl font-serif font-bold text-stone-900">The Motif-Movie Archive</h2>
              <p className="text-stone-600 font-serif italic">A scholarly mapping of themes, plays, and their modern-day descendants.</p>
            </div>
          </div>
          <NetworkGraph />
        </section>

        {/* Content Sections (Vocabulary) */}
        <ContentSections />

        {/* Current Events Section */}
        <CurrentEvents />

        {/* Resources Section */}
        <Resources />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4c5a9] py-12 px-6 bg-[#fcf8e8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <ScrollText className="text-stone-600" size={20} />
            <span className="font-serif text-lg font-bold text-stone-800">ShakeSphere</span>
          </div>
          <p className="text-stone-600 text-sm font-serif">
            Built with passion for literature and data. © 2026
          </p>
          <div className="flex items-center gap-6 text-stone-600">
            <Link to="/kids" className="hover:text-amber-900 transition-colors font-serif font-bold flex items-center gap-1">
              <Star size={16} className="text-amber-500 fill-amber-500" /> Kids Mode
            </Link>
            <a href="#" className="hover:text-stone-900 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-stone-900 transition-colors"><Github size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};
