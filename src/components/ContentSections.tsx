import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Languages, Github, ExternalLink, RefreshCw, Quote } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface Word {
  term: string;
  definition: string;
  play: string;
  context: string;
  size: number;
}

export const ContentSections: React.FC = () => {
  const [quote, setQuote] = useState({ text: "The common people call it love-in-idleness.", source: "A Midsummer Night's Dream" });
  const [words, setWords] = useState<Word[]>([
    { term: "Eyeball", definition: "The round part of the eye.", play: "The Tempest", context: "Prospero to Ariel", size: 1.5 },
    { term: "Swagger", definition: "To walk or behave in a very confident and typically arrogant or aggressive way.", play: "A Midsummer Night's Dream", context: "Puck", size: 1.8 },
    { term: "Assassination", definition: "The action of assassinating someone.", play: "Macbeth", context: "Macbeth's soliloquy", size: 1.2 },
    { term: "Pickle", definition: "A difficult situation.", play: "The Tempest", context: "Alonso", size: 1.4 }
  ]);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);

  const fetchQuote = async () => {
    setLoadingQuote(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Give me a famous or interesting Shakespeare quote and its source play. Format as JSON: { \"text\": \"...\", \"source\": \"...\" }",
        config: {
          responseMimeType: "application/json"
        }
      });
      const data = JSON.parse(response.text || "{}");
      if (data.text && data.source) {
        setQuote(data);
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setLoadingQuote(false);
    }
  };

  const fetchWords = async () => {
    setLoadingWords(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate 5-7 unique words or phrases invented or popularized by Shakespeare. For each, provide the term, a brief definition, the play it first appeared in, and a short context or character name. Also include a 'size' property (1.0 to 2.0) for visual weighting in a word cloud.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                definition: { type: Type.STRING },
                play: { type: Type.STRING },
                context: { type: Type.STRING },
                size: { type: Type.NUMBER }
              },
              required: ["term", "definition", "play", "context", "size"]
            }
          }
        }
      });
      const data = JSON.parse(response.text || "[]");
      if (Array.isArray(data) && data.length > 0) {
        setWords(data);
      }
    } catch (error) {
      console.error("Failed to fetch words:", error);
    } finally {
      setLoadingWords(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchWords();
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
            <button 
              onClick={fetchWords}
              disabled={loadingWords}
              className="flex items-center gap-2 px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-serif font-bold transition-all border border-amber-300 shadow-sm"
            >
              <RefreshCw size={18} className={loadingWords ? "animate-spin" : ""} />
              Refresh Vocabulary
            </button>
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
                    <motion.div
                      key={word.term}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative"
                    >
                      <span 
                        style={{ fontSize: `${word.size * 1.2}rem` }}
                        className="font-serif font-bold text-stone-800 hover:text-amber-700 cursor-help transition-colors duration-300"
                      >
                        {word.term}
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#fcf8e8] border border-[#d4c5a9] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                        <p className="text-[10px] font-bold text-amber-900 uppercase tracking-tighter mb-1">{word.play}</p>
                        <p className="text-xs text-stone-700 font-serif italic leading-tight mb-2">"{word.definition}"</p>
                        <p className="text-[9px] text-stone-500 font-serif">— {word.context}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Quote Section */}
        <div className="bg-[#fdfaf1] rounded-3xl p-12 border-2 border-[#d4c5a9] relative overflow-hidden group shadow-inner text-center max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 p-8 opacity-5">
            <Quote size={120} />
          </div>
          <button 
            onClick={fetchQuote}
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
    </div>
  );
};
