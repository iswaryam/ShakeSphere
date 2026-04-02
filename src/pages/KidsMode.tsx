import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, Heart, Ghost, Sword, ArrowLeft, Search, RefreshCw, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_PLAYS, PlaySummary } from '../data/plays';
import { GoogleGenAI } from "@google/genai";

export const KidsMode: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlay, setSelectedPlay] = useState<PlaySummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const filteredPlays = ALL_PLAYS.filter(play => 
    play.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    play.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchKidSummary = async (play: PlaySummary) => {
    setSelectedPlay(play);
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      setAiSummary(play.shortSummary);
      return;
    }
    setLoadingSummary(true);
    setAiSummary(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain the Shakespeare play "${play.title}" to a 7-year-old child. Use simple words, emojis, and focus on the fun parts. Keep it under 100 words. Mention if it's a Comedy, Tragedy, or History in a fun way.`,
      });
      setAiSummary(response.text || "Oops! The word-wizard is sleeping. Try again later!");
    } catch (error) {
      console.error("Failed to fetch kid summary:", error);
      setAiSummary(play.shortSummary); // Fallback to hardcoded short summary
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] selection:bg-yellow-200 selection:text-yellow-900 font-serif">
      {/* Header */}
      <nav className="p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors font-bold">
          <ArrowLeft size={20} />
          Back to Archive
        </Link>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" size={24} />
          <span className="text-2xl font-bold text-stone-900">ShakeSphere Kids!</span>
          <Star className="text-yellow-500 fill-yellow-500" size={24} />
        </div>
        <div className="w-24" /> {/* Spacer */}
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-stone-900"
          >
            Shakespeare is for <span className="text-amber-600 italic underline decoration-wavy">YOU!</span>
          </motion.h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto italic">
            Magic, monsters, and big adventures! Click on any play to hear its story.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text"
            placeholder="Search for a play (e.g. Macbeth)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full border-4 border-amber-200 bg-white shadow-inner focus:outline-none focus:border-amber-400 transition-colors text-lg"
          />
        </div>

        {/* Plays Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlays.map((play, index) => (
            <motion.button
              key={play.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchKidSummary(play)}
              className={`p-6 rounded-[2rem] border-4 shadow-lg flex flex-col items-center text-center space-y-3 transition-all bg-white hover:shadow-xl
                ${play.type === 'Comedy' ? 'border-purple-200 hover:border-purple-400' : 
                  play.type === 'Tragedy' ? 'border-rose-200 hover:border-rose-400' : 
                  'border-blue-200 hover:border-blue-400'}`}
            >
              <div className="text-5xl">{play.emoji}</div>
              <h3 className="text-lg font-bold leading-tight text-stone-800">{play.title}</h3>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full
                ${play.type === 'Comedy' ? 'bg-purple-100 text-purple-700' : 
                  play.type === 'Tragedy' ? 'bg-rose-100 text-rose-700' : 
                  'bg-blue-100 text-blue-700'}`}>
                {play.type}
              </span>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Summary Modal */}
      <AnimatePresence>
        {selectedPlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full border-8 border-amber-200 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedPlay(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 text-stone-400 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="text-8xl animate-bounce">{selectedPlay.emoji}</div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-stone-900">{selectedPlay.title}</h2>
                  <span className={`text-sm font-bold uppercase px-3 py-1 rounded-full
                    ${selectedPlay.type === 'Comedy' ? 'bg-purple-100 text-purple-700' : 
                      selectedPlay.type === 'Tragedy' ? 'bg-rose-100 text-rose-700' : 
                      'bg-blue-100 text-blue-700'}`}>
                    {selectedPlay.type}
                  </span>
                </div>

                <div className="bg-amber-50 p-6 rounded-3xl border-2 border-dashed border-amber-200 w-full min-h-[150px] flex items-center justify-center">
                  {loadingSummary ? (
                    <div className="flex flex-col items-center gap-4">
                      <RefreshCw size={40} className="animate-spin text-amber-400" />
                      <p className="italic text-amber-600 font-bold">The word-wizard is thinking...</p>
                    </div>
                  ) : (
                    <p className="text-xl leading-relaxed text-stone-700 italic">
                      {aiSummary}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => fetchKidSummary(selectedPlay)}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-bold transition-all border-2 border-amber-300"
                  >
                    <RefreshCw size={18} />
                    Tell me again!
                  </button>
                  <a 
                    href={`https://www.folger.edu/explore/shakespeares-works/${selectedPlay.title.toLowerCase().replace(/['']/g, '').replace(/ /g, '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full font-bold transition-all border-2 border-stone-300"
                  >
                    Learn More (Folger)
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 text-center text-stone-400 italic space-y-4">
        <div className="flex flex-col items-center justify-center gap-2 text-lg not-italic font-serif">
          <p className="text-stone-800">Created by: <a href="https://www.linkedin.com/in/iswarya/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-bold">Iswarya Murali</a></p>
          <p className="text-stone-800">GitHub: <a href="https://github.com/iswaryam/shakesphere" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-bold">shakesphere</a></p>
        </div>
      </footer>
    </div>
  );
};
