import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Languages, Github, ExternalLink, RefreshCw, Quote as QuoteIcon, X, Info } from 'lucide-react';
import { SHAKESPEARE_VOCABULARY, Word } from '../data/vocabulary';
import { SHAKESPEARE_QUOTES, Quote } from '../data/quotes';

export const ContentSections: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({ text: "The common people call it love-in-idleness.", source: "A Midsummer Night's Dream" });
  const [words, setWords] = useState<Word[]>([]);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const refreshQuote = () => {
    setLoadingQuote(true);
    setTimeout(() => {
      const randomQuote = SHAKESPEARE_QUOTES[Math.floor(Math.random() * SHAKESPEARE_QUOTES.length)];
      setQuote(randomQuote);
      setLoadingQuote(false);
    }, 500);
  };

  const refreshWords = () => {
    setLoadingWords(true);
    setTimeout(() => {
      // Separate words and phrases
      const allWords = SHAKESPEARE_VOCABULARY.filter(w => !w.term.includes(' '));
      const allPhrases = SHAKESPEARE_VOCABULARY.filter(w => w.term.includes(' '));
      
      // Shuffle both
      const shuffledWords = [...allWords].sort(() => 0.5 - Math.random());
      const shuffledPhrases = [...allPhrases].sort(() => 0.5 - Math.random());
      
      // Pick a mix: 4-5 words and 2-3 phrases
      const selectedWords = shuffledWords.slice(0, 4 + Math.floor(Math.random() * 2));
      const selectedPhrases = shuffledPhrases.slice(0, 2 + Math.floor(Math.random() * 2));
      
      // Combine and shuffle again
      const combined = [...selectedWords, ...selectedPhrases].sort(() => 0.5 - Math.random());
      
      setWords(combined);
      setLoadingWords(false);
    }, 600);
  };

  useEffect(() => {
    refreshQuote();
    refreshWords();
  }, []);

  return (
    <div className="space-y-24 py-12">
      {/* Linguistic Legacy Section */}
      <section id="language" className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest border border-amber-200">
              <Languages size={14} />
              Linguistic Legacy
            </div>
            <h2 className="text-5xl font-serif font-bold text-stone-900 leading-tight">The Bard's <br/>Living Vocabulary</h2>
            <p className="text-stone-600 text-lg leading-relaxed font-serif italic">
              Shakespeare didn't just write plays; he literally invented the language we use to describe our world. 
              He added over 1,700 words to English, many of which you likely used today without realizing their 16th-century origin.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={refreshWords}
                disabled={loadingWords}
                className="flex items-center gap-2 px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-serif font-bold transition-all border border-amber-300 shadow-sm w-fit"
              >
                <RefreshCw size={18} className={loadingWords ? "animate-spin" : ""} />
                Refresh Vocabulary
              </button>
              <p className="text-xs text-stone-400 font-serif italic flex items-center gap-1">
                <Info size={12} /> Click a word or phrase to see its story.
              </p>
            </div>
          </motion.div>

          <div className="bg-[#fdfaf1] rounded-[2rem] p-8 border-2 border-[#d4c5a9] shadow-inner min-h-[400px] flex flex-wrap items-center justify-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <AnimatePresence mode="wait">
              {loadingWords ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <RefreshCw size={40} className="animate-spin text-amber-800/20" />
                  <p className="font-serif italic text-amber-800/40">Consulting the First Folio...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="cloud"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap justify-center gap-x-6 gap-y-4"
                >
                  {words.map((word, i) => (
                    <motion.button
                      key={word.term}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedWord(word)}
                      className="group relative"
                    >
                      <span 
                        style={{ fontSize: `${word.size * 1.2}rem` }}
                        className="font-serif font-bold text-stone-800 hover:text-amber-700 transition-colors duration-300 underline decoration-amber-200/50 decoration-wavy underline-offset-4"
                      >
                        {word.term}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Quote Section */}
        <div className="bg-[#fdfaf1] rounded-3xl p-12 border-2 border-[#d4c5a9] relative overflow-hidden group shadow-inner text-center max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 p-8 opacity-5">
            <QuoteIcon size={120} />
          </div>
          <button 
            onClick={refreshQuote}
            disabled={loadingQuote}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors z-20"
          >
            <RefreshCw size={16} className={loadingQuote ? "animate-spin" : ""} />
          </button>
          <div className="space-y-6 relative z-10">
            <blockquote className="text-3xl md:text-4xl font-serif italic text-stone-800 leading-snug">
              "{quote.text}"
            </blockquote>
            <p className="text-amber-900 font-serif font-bold tracking-widest uppercase text-sm">— {quote.source} —</p>
          </div>
        </div>
      </section>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#fdfaf1] rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full border-4 border-[#d4c5a9] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
              
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="space-y-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                  Etymology Spotlight
                </div>
                
                <h3 className="text-4xl font-serif font-bold text-stone-900">
                  {selectedWord.term}
                </h3>
                
                <div className="space-y-4">
                  <div className="p-6 bg-white/50 rounded-2xl border border-amber-100 italic font-serif text-lg text-stone-700">
                    "{selectedWord.definition}"
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-amber-900 uppercase tracking-widest">First Recorded Appearance</p>
                    <p className="text-xl font-serif font-bold text-stone-800">{selectedWord.play}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-amber-100">
                    <p className="text-xs text-stone-400 font-serif mb-2 uppercase tracking-widest">Context</p>
                    <p className="text-stone-600 font-serif italic">
                      — {selectedWord.context}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedWord(null)}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-serif font-bold hover:bg-stone-800 transition-colors shadow-lg"
                >
                  Fascinating!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
